import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../Header/Login/Firebase";
import { useDialog } from "../context/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";

const Preview = ({ setPublish, description, title, addPost, image }) => {
    const imageRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState("");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { formattedName } = useDialog();

    const [preview, setPreview] = useState({
        title: "",
        photo: "",
    });

    useEffect(() => {
        if (title || description) {
            setPreview((prev) => ({ ...prev, title }));
            setDesc(description);
        }
        if (image) {
            setImageUrl(URL.createObjectURL(image));
            setPreview((prev) => ({ ...prev, photo: image }));
        }
    }, [title, description, image]);


    const handleClick = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!preview.title.trim() || !desc.trim() || tags.length === 0 || !preview.photo) {
            toast.error("Please fill all fields and upload an image!");
            return;
        }

        setLoading(true);

        try {
            const imageRef = ref(storage, `blogs/${preview.photo.name}`);
            await uploadBytes(imageRef, preview.photo);
            const imageURL = await getDownloadURL(imageRef);

            const newPost = await addDoc(collection(db, "blogs"), {
                title: preview.title,
                description: desc,
                tags,
                imageUrl: imageURL,
                author: formattedName || "Anonymous",
                authorId: user.uid,
                createdAt: new Date(),
            });

            toast.success("Blog published successfully!", { autoClose: 3000 });

            setTimeout(() => {
                addPost(newPost);
                setPublish(false);
                setLoading(false);
                navigate(`/medium`);
            }, 1000);
        } catch (error) {
            console.error("Error publishing blog:", error);
            toast.error("Failed to publish the blog.");
            setLoading(false);
        }
    };

    return (
        <section className="absolute inset-0 bg-white z-30 w-full h-full flex justify-center items-center">
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] bg-red-500 mt-[0] md:mt-[-20px] sm:mt-[100px] dtop xl:w-[60%] bg-white h-auto p-4 relative overflow-hidden">
                <ToastContainer position="top-right" autoClose={5000} />

                <span
                    onClick={() => setPublish(false)}
                    className="absolute right-[1rem] top-[1rem] sm:top-[1rem] text-2xl cursor-pointer z-40">
                    <LiaTimesSolid />
                </span>

                <div className="mt-12 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-[60%]">
                        <h3 className="text-lg font-bold">Story Preview</h3>

                        <div
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                textAlign: "center",
                                fontSize: "15px",
                                fontWeight: "400",
                                color: "#989898",
                            }}
                            onClick={handleClick}
                            className="w-full h-[200px] bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat relative z-30">
                            <span className="w-[60%]">
                                {!imageUrl && "Include a high-quality image in your story to make it more inviting to readers."}
                            </span>
                        </div>

                        <input
                            onChange={(e) => {
                                setImageUrl(URL.createObjectURL(e.target.files[0]));
                                setPreview({ ...preview, photo: e.target.files[0] });
                            }}
                            ref={imageRef}
                            type="file"
                            hidden
                        />

                        <input
                            type="text"
                            placeholder="Write a preview title"
                            className="outline-none w-full border-b border-gray-300 py-2 text-lg"
                            value={preview.title}
                            onChange={(e) => setPreview({ ...preview, title: e.target.value })}
                        />

                        <ReactQuill
                            theme="bubble"
                            value={desc}
                            onChange={setDesc}
                            placeholder="Write a preview subtitle..."
                            className="py-3 border-b border-gray-300"
                        />

                        <p className="text-gray-500 pt-4 text-sm">
                            <span className="font-bold">Note:</span> Changes here will affect
                            how your story appears in public places like Medium’s homepage and
                            in subscribers’ inboxes — not the contents of the story itself.
                        </p>
                    </div>

                    <div className="w-full md:w-[40%] flex flex-col gap-4">
                        <h3 className="text-2xl">
                            Publishing to:
                            <span className="font-bold capitalize"> {formattedName}</span>
                        </h3>
                        <p>Add or change topics up to 5 so readers know what your story is about</p>
                        <TagsInput value={tags} onChange={setTags} />
                        <p>
                            <span style={{ textDecoration: "underline" }}>Learn more</span> about what happens to your post when you publish.
                        </p>

                        <button
                            onClick={handleSubmit}
                            className="btn bg-[#1A8917] text-white rounded-full p-3 text-sm">
                            {loading ? "Submitting..." : "Publish Now"}
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Preview;
