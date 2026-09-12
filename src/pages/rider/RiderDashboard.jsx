const RiderDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Rider Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Assigned Parcels</div>
          <div className="stat-value text-secondary">0</div>
          <div className="stat-desc">Currently assigned</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">In Transit</div>
          <div className="stat-value text-info">0</div>
          <div className="stat-desc">On the way</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Delivered Today</div>
          <div className="stat-value text-success">0</div>
          <div className="stat-desc">Completed today</div>
        </div>
      </div>

      <div className="mt-8 card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Assigned Parcels</h2>
          <p className="opacity-70">Day 5 থেকে এখানে Assigned Parcels দেখা যাবে।</p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;