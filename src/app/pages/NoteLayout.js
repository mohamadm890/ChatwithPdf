import Sidebarnote from './Sidebarnote';

const NoteLayout = ({ children, noteId }) => {
  return (
    <div className="flex min-h-screen bg-backgroundcolor"> {/* 1. Flex container */}
      <div className="w-72"> {/* 2. Fixed width for sidebar */}
        <Sidebarnote noteId={noteId} />
      </div>
      <div className="flex-1 p-12"> {/* 3. Content takes remaining space */}
        {children}
      </div>
    </div>
  );
};

export default NoteLayout;
