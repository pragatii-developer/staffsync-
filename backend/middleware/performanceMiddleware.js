// 7. Optimization: API Optimization & Performance Monitoring Middleware
const performanceMonitor = (req, res, next) => {
  const startHrTime = process.hrtime();
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2);
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[PerfMonitor] ${req.method} ${req.originalUrl} - ${res.statusCode} [${elapsedTimeInMs}ms]`);
    }
  });
  res.setHeader('X-Powered-By', 'StaffSync-HRM-Engine');
  next();
};

module.exports = { performanceMonitor };
