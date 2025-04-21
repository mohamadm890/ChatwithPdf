import { create } from 'zustand';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";


const userVideoStore = create((set) => ({
    videoData: null,
    flashCard: [],
    files: [],
    user: {
      uid: null,
      email: null,
      accesstoken: null
    },
  authenticated: false,

  getUser: () => get().user,
  isAuthenticated: () => get().authenticated,
  setAuthenticated: (authenticated) => set({ authenticated }),
  setFiles: (file) => {
    set((state) => ({
      files: [...state.files, file]
    }))
  },
  resetFiles: () => set({ files: [] }),
  setUser: (user) => {
    set((state) => ({
      user: {
        ...state.user,
        uid: user.uid,
        email: user.email,
        accesstoken: user.accesstoken
      },
    }));
    localStorage.setItem("user", JSON.stringify(user)); 
  },
  getUserUid: () => {
    const state = useUserStore.getState();
    return state.user.uid;
  },


    setVideoDate: (data ) => set({videoData: data}),
    setFlashcard: (data ) => set({flashCard: data}),
    setFile_pdf: (file) => set((state) => ({ files: [...state.files, file] })),
    logOut: async () => {
        try {
          // Sign out from Firebase
          await signOut(auth);
          set({ authenticated: false });
          localStorage.removeItem("user");
          console.log("User signed out from Firebase.");
    
          // Clear local state using Zustand
        } catch (error) {
          console.error("Error during Firebase logout: ", error);
        }
      },
    
 

}
));
export default userVideoStore;