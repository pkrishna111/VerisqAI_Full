import "../styles/UserDetailsModal.css";

function UserDetailsModal({
  user,
  onClose
}) {

  if (!user) {
    return null;
  }

  return (
    <div className="userdetailsmodal-overlay">

      <div className="userdetailsmodal">

        <div className="userdetailsmodal-header">

          <h2>
            User Details
          </h2>

          <button
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="userdetailsmodal-body">

          <div>
            <strong>Name:</strong>
            {user.fullName}
          </div>

          <div>
            <strong>Email:</strong>
            {user.email}
          </div>

          <div>
            <strong>Company:</strong>
            {user.companyName}
          </div>

          <div>
            <strong>Domain:</strong>
            {user.companyDomain}
          </div>

          <div>
            <strong>Phone:</strong>
            {user.mobilePhone}
          </div>

          <div>
            <strong>Status:</strong>
            {user.status}
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDetailsModal;