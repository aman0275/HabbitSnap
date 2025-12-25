import { sortAlertsByPriority } from "../../utils/aiAggregationHelpers";
import { ALERT_TYPES, DASHBOARD_LIMITS } from "../../constants/aiAggregation";

/**
 * Alert Aggregator
 * Handles aggregation of risk alerts across habits
 */
export class AlertAggregator {
  /**
   * Aggregate risk alerts
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Object} Aggregated alert data
   */
  static aggregateRiskAlerts(habitInsights) {
    const allAlerts = this.collectAllAlerts(habitInsights);
    const filteredAlerts = this.filterRelevantAlerts(allAlerts);
    const sortedAlerts = sortAlertsByPriority(filteredAlerts);

    return {
      urgent: sortedAlerts.filter((a) => a.type === ALERT_TYPES.URGENT),
      warnings: sortedAlerts.filter((a) => a.type === ALERT_TYPES.WARNING),
      total: sortedAlerts.length,
    };
  }

  /**
   * Collect all alerts from habit insights
   * @param {Array<Object>} habitInsights - Array of habit insight objects
   * @returns {Array<Object>} Array of alert objects with habit names
   */
  static collectAllAlerts(habitInsights) {
    return habitInsights.flatMap((insight) => {
      const alerts = insight.predictions?.alerts || [];
      return alerts.map((alert) => ({
        ...alert,
        habitName: insight.habit.name,
      }));
    });
  }

  /**
   * Filter relevant alerts (urgent and warnings only)
   * @param {Array<Object>} alerts - Array of alert objects
   * @returns {Array<Object>} Filtered alerts
   */
  static filterRelevantAlerts(alerts) {
    return alerts.filter(
      (alert) =>
        alert.type === ALERT_TYPES.URGENT || alert.type === ALERT_TYPES.WARNING
    );
  }
}

