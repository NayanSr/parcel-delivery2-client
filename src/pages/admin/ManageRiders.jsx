import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRiders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await axios.get(`${API}/users/riders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRiders(res.data);
      } catch (error) {
        toast.error("Failed to load riders");
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, []);

  const filteredRiders = riders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(search.toLowerCase()) ||
      rider.email.toLowerCase().includes(search.toLowerCase()) ||
      (rider.phone && rider.phone.includes(search))
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Manage Riders</h1>
        <div className="badge badge-secondary badge-lg">
          Total Riders: {filteredRiders.length}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredRiders.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center py-16">
            <p className="text-lg opacity-60">No riders found</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRiders.map((rider) => (
            <div key={rider._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-secondary text-secondary-content rounded-full w-12">
                      <span className="text-xl">
                        {rider.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title text-lg">{rider.name}</h2>
                    <p className="text-sm opacity-70">{rider.email}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {rider.phone || "Not set"}
                  </p>
                  <p>
                    <span className="font-semibold">Joined:</span>{" "}
                    {new Date(rider.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <span className="badge badge-secondary">Rider</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRiders;