import prometheus from "prom-client";

prometheus.collectDefaultMetrics({
  timeout: 5000,
});

const httpRequests = new prometheus.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const httpRequestDuration = new prometheus.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 2, 5, 6, 10],
});

const dbQueryDuration = new prometheus.Histogram({
  name: "db_query_duration_seconds",
  help: "Duration of database queries in seconds",
  labelNames: ["query_type"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

const activeSessions = new prometheus.Gauge({
  name: "active_sessions",
  help: "Number of active user sessions",
});

const memoryUsageSummary = new prometheus.Summary({
  name: "memory_usage_bytes",
  help: "Memory usage in bytes",
  labelNames: ["memory_type"],
});

setInterval(() => {
  const memoryUsage = process.memoryUsage();
  memoryUsageSummary.observe({ memory_type: "heap_used" }, memoryUsage.heapUsed);
  memoryUsageSummary.observe({ memory_type: "heap_total" }, memoryUsage.heapTotal);
}, 5000);

export { prometheus, httpRequests, httpRequestDuration, dbQueryDuration, activeSessions, memoryUsageSummary };