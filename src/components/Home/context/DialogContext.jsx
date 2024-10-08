
// import { createContext, useContext, useState } from 'react';

// const DialogContext = createContext();

// export const useDialog = () => useContext(DialogContext);

// export const DialogProvider = ({ children }) => {
//     const [open, setOpen] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(null);

//     const handleClickOpen = () => setOpen(true);
//     const handleClose = (value) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };

//     return (
//         <DialogContext.Provider value={{ open, selectedValue, handleClickOpen, handleClose, setOpen }}>
//             {children}
//         </DialogContext.Provider>
//     );
// };