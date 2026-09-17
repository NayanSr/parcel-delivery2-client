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

const MyParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/parcels/my-parcels",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setParcels(res.data);
      } catch (error) {
        toast.error("Failed to load parcels");
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Parcels</h1>

      {parcels.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center py-16">
            <p className="text-lg opacity-60">You haven't booked any parcel yet.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-base-100 shadow">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono font-semibold">
                    {parcel.trackingId}
                  </td>
                  <td>
                    <div>{parcel.receiverName}</div>
                    <div className="text-xs opacity-60">
                      {parcel.receiverPhone}
                    </div>
                  </td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.weight} kg</td>
                  <td>৳ {parcel.cost}</td>
                  <td>
                    <span className={`badge ${statusColor[parcel.status]}`}>
                      {parcel.status}
                    </span>
                  </td>
                  <td>
                    {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;