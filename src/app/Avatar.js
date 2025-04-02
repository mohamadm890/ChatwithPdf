 function Avatar({ email }) {
    // استخراج أول حرفين من البريد الإلكتروني وتحويلهما إلى أحرف كبيرة
    const initials = email.slice(0, 1).toUpperCase();
  
    return (
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#ccc", // لون الخلفية يمكن تغييره حسب رغبتك
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#fff",
          fontSize: "1rem",
        }}
      >
        {initials}
      </div>
    )}
    export default Avatar;