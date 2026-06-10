import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import AiMonitoringStats from "../components/AiMonitoringStats";

import AiProcessingVolumeChart from "../components/AiProcessingVolumeChart";

import AiModelUsageChart from "../components/AiModelUsageChart";

import AiActivityTable from "../components/AiActivityTable";

import AiFailedRequestsTable from "../components/AiFailedRequestsTable";
import AiMonitoringSkeleton from "../components/skeletons/AiMonitoringSkeleton";
import {
  getAiStats,
  getAiActivity,
  getModelUsage,
  getProcessingVolume,
  getFailedRequests
} from "../services/aiMonitoringApi";

import "../styles/AiMonitoring.css";

function AiMonitoring() {
  const [loading, setLoading] =
  useState(true);
  const [stats, setStats] =
    useState(null);

  const [activity, setActivity] =
    useState([]);

  const [modelUsage, setModelUsage] =
    useState([]);

  const [processingVolume,
    setProcessingVolume] =
    useState([]);

  const [failedRequests,
    setFailedRequests] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {
  
      setLoading(true);
  
      const startTime = Date.now();
  
      const statsData =
        await getAiStats();
  
      const activityData =
        await getAiActivity();
  
      const modelUsageData =
        await getModelUsage();
  
      const processingVolumeData =
        await getProcessingVolume();
  
      const failedRequestsData =
        await getFailedRequests();
  
      const elapsed =
        Date.now() - startTime;
  
      const minimumSkeletonTime = 1000;
  
      if (
        elapsed <
        minimumSkeletonTime
      ) {
  
        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              minimumSkeletonTime - elapsed
            )
        );
  
      }
  
      setStats(
        statsData
      );
  
      setActivity(
        activityData
      );
  
      setModelUsage(
        modelUsageData
      );
  
      setProcessingVolume(
        processingVolumeData
      );
  
      setFailedRequests(
        failedRequestsData
      );
  
    }
    catch (error) {
  
      console.error(
        "AI Monitoring Error:",
        error
      );
  
    }
    finally {
  
      setLoading(false);
  
    }
  
  };
  if (loading) {

    return (
  
      <AdminLayout>
  
        <AiMonitoringSkeleton />
  
      </AdminLayout>
  
    );
  
  }
  return (
    <AdminLayout>

      <div className="aimonitoring">

        <div className="aimonitoring-header">

          <h1>
            AI Monitoring
          </h1>

          <p>
            Monitor AI requests,
            model performance,
            confidence scores
            and failures
          </p>

        </div>

        {stats && (

          <AiMonitoringStats
            stats={stats}
          />

        )}

        <div className="aimonitoring-charts">

          <AiProcessingVolumeChart
            data={
              processingVolume
            }
          />

          <AiModelUsageChart
            data={
              modelUsage
            }
          />

        </div>

        <AiActivityTable
          data={activity}
        />

        <AiFailedRequestsTable
          data={
            failedRequests
          }
        />

      </div>

    </AdminLayout>
  );
}

export default AiMonitoring;