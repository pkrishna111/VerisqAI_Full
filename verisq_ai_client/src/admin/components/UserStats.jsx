import "../styles/UserStats.css";

function UserStats({
  stats
}) {

  return (

    <div className="userstats">

      <div className="userstats-card">

        <span>
          Total Users
        </span>

        <h2>
          {stats.totalUsers || 0}
        </h2>

      </div>

      <div className="userstats-card approved">

        <span>
          Approved
        </span>

        <h2>
          {stats.approvedUsers || 0}
        </h2>

      </div>

      <div className="userstats-card pending">

        <span>
          Pending
        </span>

        <h2>
          {stats.pendingUsers || 0}
        </h2>

      </div>

      <div className="userstats-card rejected">

        <span>
          Rejected
        </span>

        <h2>
          {stats.rejectedUsers || 0}
        </h2>

      </div>

    </div>

  );
}

export default UserStats;