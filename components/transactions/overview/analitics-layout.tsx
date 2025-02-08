import { AnalyticsCard } from "./index";

export default function AnalyticsDashboard() {
  return (
    <div className="mx-auto p-6 w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsCard
            title="Revenue"
            value="$1250321"
            icon="revenue"
            gradient="blue"
          />
        </div>
        <AnalyticsCard
          title="Conversion Rate"
          value="13%"
          icon="conversion"
          gradient="purple"
        />
        <AnalyticsCard
          title="Bounce Rate"
          value="36%"
          icon="bounce"
          gradient="peach"
        />
        <AnalyticsCard
          title="Avg. Session Duration"
          value="245s"
          icon="session"
          gradient="purple"
        />
        <AnalyticsCard
          title="New Users"
          value="15420"
          icon="newUsers"
          gradient="peach"
        />
      </div>
    </div>
  );
}
