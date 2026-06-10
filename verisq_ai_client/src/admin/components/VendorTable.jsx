import "../styles/VendorTable.css";

function VendorTable({
  vendors = [],
  onViewVendor,
  onDelete,
  startIndex = 0
}) {

  const getRiskTierLabel = (
    riskTier
  ) => {

    switch (riskTier) {

      case 1:
        return "Low";

      case 2:
        return "Medium";

      case 3:
        return "High";

      case 4:
        return "Critical";

      default:
        return "N/A";
    }
  };

  return (

    <div className="vendortable-container">

      <table className="vendortable">

        <thead>

          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Email</th>
            <th>Status</th>
            <th>Risk Tier</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {vendors.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="vendortable-empty"
              >
                No vendors found
              </td>

            </tr>

          ) : (

            vendors.map(
              (
                vendor,
                index
              ) => (

                <tr key={vendor.id}>

                  <td>
                    {startIndex + index + 1}
                  </td>

                  <td
                    className="vendortable-clickable"
                    onClick={() =>
                      onViewVendor(
                        vendor.id
                      )
                    }
                  >
                    {vendor.name}
                  </td>

                  <td>
                    {vendor.domain || "-"}
                  </td>

                  <td>
                    {vendor.email || "-"}
                  </td>

                  <td>

                    <span
                      className={`vendor-status ${vendor.status?.toLowerCase()}`}
                    >
                      {vendor.status || "N/A"}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`risk-tier risk-tier-${vendor.riskTier}`}
                    >
                      {getRiskTierLabel(
                        vendor.riskTier
                      )}
                    </span>

                  </td>

                  <td>

                    {vendor.score !== null &&
                      vendor.score !== undefined

                      ? vendor.score

                      : "N/A"}

                  </td>

                  <td>

                    <button
                      className="vendortable-view-btn"
                      onClick={(e) => {

                        e.stopPropagation();

                        onViewVendor(
                          vendor.id
                        );

                      }}
                    >
                      View
                    </button>

                    <button
                      className="vendortable-delete-btn"
                      onClick={(e) => {

                        e.stopPropagation();

                        onDelete(
                          vendor.id
                        );

                      }}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>

  );
}

export default VendorTable;