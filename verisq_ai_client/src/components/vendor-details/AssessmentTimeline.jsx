import "../../styles/vendor-details/assessmentTimeline.css";

import {
  CalendarDays,
  ShieldAlert,
  FileCheck2,
  ChevronRight
} from "lucide-react";

import { getRiskTierLabel } from "../../utils/riskUtils";

const AssessmentTimeline = ({
  assessments = [],
  selectedAssessment,
  onSelectAssessment
}) => {
  return (
    <div className="vd-assessment-timeline">
      <div className="vd-assessment-timeline__header">
        <h3 className="vd-assessment-timeline__title">
          Assessment History
        </h3>

        <p className="vd-assessment-timeline__subtitle">
          Historical vendor assessments
        </p>
      </div>

      <div className="vd-assessment-timeline__list">
        {assessments.map((assessment) => {
          const isActive =
            selectedAssessment?.scorecard?.id ===
            assessment.scorecardId;

          return (
            <button
              key={assessment.id}
              className={`vd-assessment-timeline__item ${
                isActive
                  ? "vd-assessment-timeline__item--active"
                  : ""
              }`}
              onClick={() =>
                onSelectAssessment(assessment)
              }
            >
              <div className="vd-assessment-timeline__top">
                <div className="vd-assessment-timeline__date">
                  <CalendarDays size={15} />

                  <span>
                    {new Date(
                      assessment.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <ChevronRight size={16} />
              </div>

              <div className="vd-assessment-timeline__metrics">
                <div className="vd-assessment-timeline__metric">
                  <ShieldAlert size={14} />

                  <span>
                    Risk {assessment.riskScore}
                  </span>
                </div>

                <div className="vd-assessment-timeline__metric">
                  <FileCheck2 size={14} />

                  <span>
                    {assessment.findingsCount} Findings
                  </span>
                </div>
              </div>

              <div className="vd-assessment-timeline__footer">
                <span className="vd-assessment-timeline__tier">
                  {getRiskTierLabel(
                    assessment.riskTier
                  )}
                </span>

                <span className="vd-assessment-timeline__score">
                  Score {assessment.score}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentTimeline;