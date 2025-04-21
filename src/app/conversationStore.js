import { create } from 'zustand';
 

 const useConversationStore = create((set) => ({
    conversations: [],
    setConversations: (conversations) => set({ conversations }),
    addConversation: (conversation) => set((state) => ({ conversations: [...state.conversations, conversation] })),
  }));
  export default useConversationStore;