const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value text-primary">0</div>
          <div className="stat-desc">All time</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">0</div>
          <div className="stat-desc">Waiting for pickup</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Delivered</div>
          <div className="stat-value text-success">0</div>
          <div className="stat-desc">Successfully delivered</div>
        </div>
      </div>

      <div className="mt-8 card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <p className="opacity-70">Day 4 থেকে এখানে Book Parcel ও My Parcels দেখা যাবে।</p>
          <div className="card-actions justify-start mt-4">
            <button className="btn btn-primary btn-sm" disabled>
              Book a Parcel (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;