import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const statusOptions = [
  "pending",
  "assigned",
  "picked",
  "in-transit",
  "delivered",
  "cancelled",
];

const statusColor = {
  pending: "badge-warning",
  assigned: "badge-info",
  picked: "badge-primary",
  "in-transit": "badge-secondary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchParcels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
    } catch (error) {
      toast.error("Failed to load parcels");
    }
  };

  const fetchRiders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/riders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRiders(res.data);
    } catch (error) {
      toast.error("Failed to load riders");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchParcels(), fetchRiders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/parcels/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated");
      fetchParcels();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAssignRider = async (parcelId, riderId) => {
    if (!riderId) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/parcels/${parcelId}/assign`,
        { riderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rider assigned successfully");
      fetchParcels();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign rider");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Parcels</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra bg-base-100 shadow">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Assigned Rider</th>
              <th>Assign Rider</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-mono font-semibold">
                  {parcel.trackingId}
                </td>
                <td>
                  <div>{parcel.senderName}</div>
                  <div className="text-xs opacity-60">{parcel.senderPhone}</div>
                </td>
                <td>
                  <div>{parcel.receiverName}</div>
                  <div className="text-xs opacity-60">
                    {parcel.receiverPhone}
                  </div>
                </td>
                <td>৳ {parcel.cost}</td>
                <td>
                  <span className={`badge ${statusColor[parcel.status]}`}>
                    {parcel.status}
                  </span>
                </td>
                <td>
                  {parcel.assignedRider ? (
                    <div>
                      <div className="font-medium">
                        {parcel.assignedRider.name}
                      </div>
                      <div className="text-xs opacity-60">
                        {parcel.assignedRider.phone}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs opacity-50">Not assigned</span>
                  )}
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm w-36"
                    defaultValue=""
                    onChange={(e) =>
                      handleAssignRider(parcel._id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select Rider
                    </option>
                    {riders.map((rider) => (
                      <option key={rider._id} value={rider._id}>
                        {rider.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={parcel.status}
                    onChange={(e) =>
                      handleStatusChange(parcel._id, e.target.value)
                    }
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;