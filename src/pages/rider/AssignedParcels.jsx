import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const statusColor = {
  pending: "badge-warning",
  assigned: "badge-info",
  picked: "badge-primary",
  "in-transit": "badge-secondary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

const AssignedParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchAssigned = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/parcels/assigned",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParcels(res.data);
    } catch (error) {
      toast.error("Failed to load assigned parcels");
    } finally {
      setLoading(false);
    }
  };

  const filteredParcels = parcels.filter((parcel) =>
  parcel.trackingId.toLowerCase().includes(search.toLowerCase()) ||
  parcel.receiverName.toLowerCase().includes(search.toLowerCase()) ||
  parcel.receiverPhone.includes(search)
);

  useEffect(() => {
    fetchAssigned();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/parcels/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Status updated to ${newStatus}`);
      fetchAssigned();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assigned Parcels</h1>
      <div className="mb-6">
  <input
    type="text"
    placeholder="Search by Tracking ID, Name or Phone..."
    className="input input-bordered w-full max-w-md"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      {filteredParcels.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center py-16">
            <p className="text-lg opacity-60">
              No parcels assigned to you yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredParcels.map((parcel) => (
            <div key={parcel._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title font-mono">
                    {parcel.trackingId}
                  </h2>
                  <span className={`badge ${statusColor[parcel.status]}`}>
                    {parcel.status}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Receiver:</span>{" "}
                    {parcel.receiverName} ({parcel.receiverPhone})
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {parcel.receiverAddress}
                  </p>
                  <p>
                    <span className="font-semibold">Type / Weight:</span>{" "}
                    {parcel.parcelType} • {parcel.weight} kg
                  </p>
                  <p>
                    <span className="font-semibold">Cost:</span> ৳{parcel.cost}
                  </p>
                  {parcel.notes && (
                    <p>
                      <span className="font-semibold">Notes:</span>{" "}
                      {parcel.notes}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-end mt-4 flex-wrap gap-2">
                  {parcel.status === "assigned" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => updateStatus(parcel._id, "picked")}
                    >
                      Mark as Picked
                    </button>
                  )}

                  {parcel.status === "picked" && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => updateStatus(parcel._id, "in-transit")}
                    >
                      Start Transit
                    </button>
                  )}

                  {parcel.status === "in-transit" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => updateStatus(parcel._id, "delivered")}
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {(parcel.status === "delivered" ||
                    parcel.status === "cancelled") && (
                    <span className="text-sm opacity-60">Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedParcels;