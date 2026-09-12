const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">0</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Riders</div>
          <div className="stat-value text-secondary">0</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value text-accent">0</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Pending Parcels</div>
          <div className="stat-value text-warning">0</div>
        </div>
      </div>

      <div className="mt-8 card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Quick Overview</h2>
          <p className="opacity-70">
            Day 4 থেকে All Parcels, Assign Rider এবং Manage Users ফিচার আসবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;