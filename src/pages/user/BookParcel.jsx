import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BookParcel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: user?.name || "",
    senderPhone: user?.phone || "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    parcelType: "Box",
    weight: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/parcels",
        {
          ...formData,
          weight: parseFloat(formData.weight),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Parcel booked! Tracking ID: ${res.data.trackingId}`);
      navigate("/user/my-parcels");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book parcel");
    } finally {
      setLoading(false);
    }
  };

  // Live cost calculation
  const estimatedCost = formData.weight
    ? Math.ceil(80 + parseFloat(formData.weight || 0) * 50)
    : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Book a Parcel</h1>

      <div className="card bg-base-100 shadow-xl max-w-3xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Sender Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Sender Name</span>
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    className="input input-bordered w-full"
                    value={formData.senderName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Sender Phone</span>
                  </label>
                  <input
                    type="text"
                    name="senderPhone"
                    className="input input-bordered w-full"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control w-full md:col-span-2">
                  <label className="label min-h-8">
                    <span className="label-text">Sender Address</span>
                  </label>
                  <textarea
                    name="senderAddress"
                    className="textarea textarea-bordered w-full"
                    rows="2"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-secondary">
                Receiver Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Receiver Name</span>
                  </label>
                  <input
                    type="text"
                    name="receiverName"
                    className="input input-bordered w-full"
                    value={formData.receiverName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Receiver Phone</span>
                  </label>
                  <input
                    type="text"
                    name="receiverPhone"
                    className="input input-bordered w-full"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control w-full md:col-span-2">
                  <label className="label min-h-8">
                    <span className="label-text">Receiver Address</span>
                  </label>
                  <textarea
                    name="receiverAddress"
                    className="textarea textarea-bordered w-full"
                    rows="2"
                    value={formData.receiverAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Parcel Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent">
                Parcel Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Parcel Type</span>
                  </label>

                  <select
                    name="parcelType"
                    className="select select-bordered w-full"
                    value={formData.parcelType}
                    onChange={handleChange}
                  >
                    <option value="Document">Document</option>
                    <option value="Box">Box</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Weight (kg)</span>
                  </label>

                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    min="0.1"
                    className="input input-bordered w-full"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label min-h-8">
                    <span className="label-text">Estimated Cost</span>
                  </label>

                  <div className="input input-bordered w-full flex items-center font-bold text-primary">
                    ৳ {estimatedCost}
                  </div>
                </div>

                <div className="form-control w-full md:col-span-3">
                  <label className="label min-h-8">
                    <span className="label-text">Notes (Optional)</span>
                  </label>

                  <textarea
                    name="notes"
                    className="textarea textarea-bordered w-full"
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Parcel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
