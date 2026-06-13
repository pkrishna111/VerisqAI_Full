import { useMemo, useState, useRef } from "react";

import "../../styles/vendor-details/assessmentIntelligenceTabs.css";

import AnalyticsSection from "./AnalyticsSection";
import FindingsWorkspace from "./FindingsWorkspace";
import ResponsesTable from "./ResponsesTable";
import { ChevronDown } from "lucide-react";

export default function AssessmentIntelligenceTabs({
  scorecard,
  findings,
  responses,
}) {
  const [showAllRiskDrivers, setShowAllRiskDrivers] = useState(false);
  const tabContentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  const aiInsight = scorecard?.aiInsight;

  const aiRecommendations = scorecard?.aiRecommendations || [];

  const recommendationPreview = aiRecommendations.slice(0, 2);

  const summaryText = useMemo(() => {
    if (!aiInsight?.executiveSummary) {
      return "";
    }

    return aiInsight.executiveSummary.length > 220
      ? `${aiInsight.executiveSummary.slice(0, 220)}...`
      : aiInsight.executiveSummary;
  }, [aiInsight]);

  const switchTabAndScroll = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      tabContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };
  return (
    <section className="aii">
      {/* HEADER */}

      <div className="aii__header">
        <div>
          <h2 className="aii__title">AI Assessment Intelligence</h2>

          <p className="aii__subtitle">
            Interactive AI-generated security intelligence and remediation
            insights
          </p>
        </div>

        <div
          className={`aii__confidence ${
            !aiInsight ? "aii__confidence--empty" : ""
          }`}
        >
          <span className="aii__confidence-label">Confidence</span>

          <span className="aii__confidence-value">
            {aiInsight
              ? `${Math.round(aiInsight.confidenceScore * 100)}%`
              : "--"}
          </span>
        </div>
      </div>

      {/* TOP SUMMARY GRID */}

      {aiInsight ? (
        <div className="aii-summary-grid">
          {/* Executive Summary */}

          <div className="aii-card aii-summary-card">
            <div className="aii-card__header">
              <h3>Executive Summary</h3>

              <button
                className="aii-link-btn"
                onClick={() => switchTabAndScroll("overview")}
              >
                View Full Analysis
              </button>
            </div>

            <p className="aii-summary-text">{summaryText}</p>
          </div>

          {/* Risk Drivers */}

          <div className="aii-card">
            <div className="aii-card__header">
              <h3>Top Risk Drivers</h3>
            </div>

            <div className="aii-risk-chips">
              {(showAllRiskDrivers
                ? aiInsight.riskDrivers
                : aiInsight.riskDrivers?.slice(0, 5)
              ).map((driver, index) => {
                const shortLabel = driver
                  .split(":")[0]
                  .replace("Lack of ", "")
                  .replace("Absence of ", "");

                return (
                  <span
                    key={index}
                    className="aii-risk-chip aii-risk-chip--high"
                  >
                    {shortLabel}
                  </span>
                );
              })}
            </div>
            {aiInsight.riskDrivers?.length > 5 && (
              <button
                className="aii-link-btn"
                onClick={() => setShowAllRiskDrivers(!showAllRiskDrivers)}
              >
                {showAllRiskDrivers
                  ? "Show Less"
                  : `Show More (${aiInsight.riskDrivers.length - 5})`}
              </button>
            )}
          </div>

          {/* Recommendations Preview */}

          <div className="aii-card">
            <div className="aii-card__header">
              <h3>Recommendations</h3>

              <button
                className="aii-link-btn"
                onClick={() => switchTabAndScroll("recommendations")}
              >
                View All
              </button>
            </div>

            <div className="aii-recommendation-preview-list">
              {recommendationPreview.map((item, index) => (
                <div key={index} className="aii-recommendation-preview">
                  <div>
                    <h4>{item.title}</h4>

                    <span
                      className={`aii-priority aii-priority--${item.priority?.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="aii-reduction">
                    Risk Reduction Opportunity
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="aii-empty">
          <h3>AI Intelligence Not Available</h3>

          <p>This assessment does not contain AI-generated insights yet.</p>
        </div>
      )}

      {/* TABS */}

      <div className="aii-tabs">
        <button
          className={`aii-tab ${
            activeTab === "overview" ? "aii-tab--active" : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={`aii-tab ${
            activeTab === "findings" ? "aii-tab--active" : ""
          }`}
          onClick={() => setActiveTab("findings")}
        >
          Findings
        </button>

        <button
          className={`aii-tab ${
            activeTab === "recommendations" ? "aii-tab--active" : ""
          }`}
          onClick={() => setActiveTab("recommendations")}
        >
          Recommendations
        </button>

        <button
          className={`aii-tab ${
            activeTab === "responses" ? "aii-tab--active" : ""
          }`}
          onClick={() => setActiveTab("responses")}
        >
          Responses
        </button>
      </div>

      {/* TAB CONTENT */}

      <div ref={tabContentRef} className="aii-tab-content">
        {activeTab === "overview" && (
          <div className="aii-overview">
            <AnalyticsSection findings={findings} scorecard={scorecard} />
          </div>
        )}

        {activeTab === "findings" && <FindingsWorkspace findings={findings} />}

        {activeTab === "recommendations" &&
          (aiRecommendations.length > 0 ? (
            <div className="aii-recommendations-full">
              {aiRecommendations.map((recommendation, index) => {
                const isExpanded = expandedRecommendation === index;

                return (
                  <div key={index} className="aii-recommendation-accordion">
                    <button
                      className="aii-recommendation-accordion__header"
                      onClick={() =>
                        setExpandedRecommendation(isExpanded ? null : index)
                      }
                    >
                      <div className="aii-recommendation-accordion__left">
                        <h3>{recommendation.title}</h3>

                        <p>{recommendation.category}</p>
                      </div>

                      <div className="aii-recommendation-accordion__right">
                        <span
                          className={`aii-priority aii-priority--${recommendation.priority?.toLowerCase()}`}
                        >
                          {recommendation.priority}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`aii-chevron ${
                            isExpanded ? "aii-chevron--expanded" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="aii-recommendation-accordion__content">
                        <p className="aii-recommendation-card__description">
                          {recommendation.description}
                        </p>

                        <div className="aii-recommendation-card__footer">
                          <div>
                            <strong>Why this matters:</strong>
                          </div>

                          <p>{recommendation.rationale}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="aii-empty">
              <h3>No AI Recommendations Available</h3>

              <p>Recommendations will appear after AI analysis is generated.</p>
            </div>
          ))}

        {activeTab === "responses" && <ResponsesTable responses={responses} />}
      </div>
    </section>
  );
}
