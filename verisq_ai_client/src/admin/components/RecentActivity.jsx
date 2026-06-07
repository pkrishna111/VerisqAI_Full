import { useEffect, useState } from "react";

import "../styles/RecentActivity.css";

import { getRecentActivity } from "../services/dashboardApi";

function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getRecentActivity();

      setActivities(data);
    }
    catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleString();
  };

  return (
    <div className="recentactivity">

      <h3 className="recentactivity-title">
        Recent Activity
      </h3>

      <div className="recentactivity-list">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="recentactivity-item"
          >

            <div>

              <h4>
                {activity.title}
              </h4>

              <p>
                {activity.description}
              </p>

            </div>

            <span>
              {formatDate(activity.time)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;