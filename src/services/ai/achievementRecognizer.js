/**
 * Achievement Recognizer Service
 * Enhanced milestone detection and achievement recognition
 */
class AchievementRecognizer {
  /**
   * Recognize achievements and milestones
   * @param {Array} entries - Array of habit entries
   * @returns {Object} Achievement recognition result
   */
  async recognize(entries) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return { achievements: [], upcomingMilestones: [] };
    }

    const sortedEntries = this.sortEntriesByDate(entries);
    const uniqueDays = this.getUniqueDays(sortedEntries);

    const achievements = [
      ...this.checkDayMilestones(uniqueDays),
      ...this.checkStreakMilestones(sortedEntries),
      ...this.checkConsistencyMilestones(sortedEntries),
      ...this.checkSpecialAchievements(sortedEntries),
    ];

    const upcomingMilestones = this.getUpcomingMilestones(uniqueDays, sortedEntries);

    return {
      achievements,
      upcomingMilestones,
      totalAchievements: achievements.length,
    };
  }

  /**
   * Sort entries by date
   * @param {Array} entries - Entries array
   * @returns {Array} Sorted entries
   */
  sortEntriesByDate(entries) {
    return [...entries].sort(
      (a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
    );
  }

  /**
   * Get unique days with entries
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Set} Set of unique date strings
   */
  getUniqueDays(sortedEntries) {
    return new Set(
      sortedEntries.map((entry) => {
        const date = new Date(entry.createdAt || entry.date);
        return date.toDateString();
      })
    );
  }

  /**
   * Check day-based milestones
   * @param {Set} uniqueDays - Unique days set
   * @returns {Array} Achievement objects
   */
  checkDayMilestones(uniqueDays) {
    const achievements = [];
    const milestones = [1, 3, 7, 14, 21, 30, 50, 100, 365];

    milestones.forEach((days) => {
      if (uniqueDays.size >= days) {
        achievements.push({
          type: "days",
          milestone: days,
          title: this.getDayMilestoneTitle(days),
          description: this.getDayMilestoneDescription(days),
          icon: this.getDayMilestoneIcon(days),
          rarity: this.getRarity(days),
        });
      }
    });

    return achievements;
  }

  /**
   * Check streak-based milestones
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Array} Achievement objects
   */
  checkStreakMilestones(sortedEntries) {
    const achievements = [];
    const currentStreak = this.calculateCurrentStreak(sortedEntries);
    const milestones = [3, 7, 14, 21, 30, 60, 100];

    milestones.forEach((streak) => {
      if (currentStreak >= streak) {
        achievements.push({
          type: "streak",
          milestone: streak,
          title: `${streak}-Day Streak! 🔥`,
          description: `You've maintained a ${streak}-day streak!`,
          icon: "flame",
          rarity: streak >= 30 ? "epic" : streak >= 14 ? "rare" : "common",
        });
      }
    });

    return achievements;
  }

  /**
   * Check consistency-based milestones
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Array} Achievement objects
   */
  checkConsistencyMilestones(sortedEntries) {
    const achievements = [];

    // Perfect week (7 days in a row)
    if (sortedEntries.length >= 7) {
      const recent7Days = sortedEntries.slice(-7);
      const uniqueDays = new Set(
        recent7Days.map((e) => {
          const d = new Date(e.createdAt || e.date);
          return d.toDateString();
        })
      );

      if (uniqueDays.size === 7) {
        achievements.push({
          type: "consistency",
          milestone: "perfect_week",
          title: "Perfect Week! ⭐",
          description: "You tracked every day for 7 days in a row!",
          icon: "star",
          rarity: "rare",
        });
      }
    }

    // 30-day consistency (at least 25 days)
    if (sortedEntries.length >= 30) {
      const recent30Days = sortedEntries.slice(-30);
      const uniqueDays = new Set(
        recent30Days.map((e) => {
          const d = new Date(e.createdAt || e.date);
          return d.toDateString();
        })
      );

      if (uniqueDays.size >= 25) {
        achievements.push({
          type: "consistency",
          milestone: "month_consistency",
          title: "Monthly Champion! 🏆",
          description: "You tracked at least 25 days in the last month!",
          icon: "trophy",
          rarity: "epic",
        });
      }
    }

    return achievements;
  }

  /**
   * Check special achievements
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Array} Achievement objects
   */
  checkSpecialAchievements(sortedEntries) {
    const achievements = [];

    // Early bird (multiple early morning entries)
    const earlyMorningEntries = sortedEntries.filter((entry) => {
      const date = new Date(entry.createdAt || entry.date);
      const hour = date.getHours();
      return hour >= 5 && hour < 8;
    });

    if (earlyMorningEntries.length >= 10) {
      achievements.push({
        type: "special",
        milestone: "early_bird",
        title: "Early Bird! 🌅",
        description: "You've tracked 10+ times in the early morning!",
        icon: "sunny",
        rarity: "rare",
      });
    }

    // Night owl (multiple night entries)
    const nightEntries = sortedEntries.filter((entry) => {
      const date = new Date(entry.createdAt || entry.date);
      const hour = date.getHours();
      return hour >= 21 || hour < 5;
    });

    if (nightEntries.length >= 10) {
      achievements.push({
        type: "special",
        milestone: "night_owl",
        title: "Night Owl! 🦉",
        description: "You've tracked 10+ times late at night!",
        icon: "moon",
        rarity: "rare",
      });
    }

    return achievements;
  }

  /**
   * Get upcoming milestones
   * @param {Set} uniqueDays - Unique days set
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Array} Upcoming milestone objects
   */
  getUpcomingMilestones(uniqueDays, sortedEntries) {
    const upcoming = [];
    const currentDays = uniqueDays.size;
    const milestones = [7, 14, 21, 30, 50, 100];

    milestones.forEach((milestone) => {
      if (currentDays < milestone && currentDays >= milestone - 3) {
        upcoming.push({
          type: "days",
          milestone,
          daysRemaining: milestone - currentDays,
          title: `${milestone} Days`,
          description: `Just ${milestone - currentDays} more day${milestone - currentDays > 1 ? "s" : ""} to reach ${milestone} days!`,
        });
      }
    });

    // Check streak milestones
    const currentStreak = this.calculateCurrentStreak(sortedEntries);
    const streakMilestones = [7, 14, 21, 30];

    streakMilestones.forEach((streak) => {
      if (currentStreak < streak && currentStreak >= streak - 2) {
        upcoming.push({
          type: "streak",
          milestone: streak,
          daysRemaining: streak - currentStreak,
          title: `${streak}-Day Streak`,
          description: `Maintain your streak for ${streak - currentStreak} more day${streak - currentStreak > 1 ? "s" : ""}!`,
        });
      }
    });

    return upcoming;
  }

  /**
   * Calculate current streak
   * @param {Array} sortedEntries - Sorted entries (ascending)
   * @returns {number} Current streak in days
   */
  calculateCurrentStreak(sortedEntries) {
    if (sortedEntries.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const uniqueDays = Array.from(
      new Set(
        sortedEntries.map((e) => {
          const d = new Date(e.createdAt || e.date);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
      )
    ).sort((a, b) => b - a);

    let streak = 0;
    let checkDate = new Date(today);

    for (const dayTime of uniqueDays) {
      const dayDate = new Date(dayTime);
      const daysDiff = Math.floor((checkDate - dayDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0 || daysDiff === 1) {
        streak++;
        checkDate = new Date(dayDate);
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get day milestone title
   * @param {number} days - Number of days
   * @returns {string} Title
   */
  getDayMilestoneTitle(days) {
    const titles = {
      1: "Getting Started! 🌱",
      3: "Three Days Strong! 💪",
      7: "One Week Complete! ⭐",
      14: "Two Weeks! 🎉",
      21: "Habit Formed! 🔥",
      30: "One Month! 🏆",
      50: "50 Days! 🌟",
      100: "100 Days! 💯",
      365: "One Year! 🎊",
    };
    return titles[days] || `${days} Days! 🎉`;
  }

  /**
   * Get day milestone description
   * @param {number} days - Number of days
   * @returns {string} Description
   */
  getDayMilestoneDescription(days) {
    if (days === 21) {
      return "Research shows 21 days to form a habit - you've done it!";
    }
    if (days === 100) {
      return "100 days of tracking - you're a habit master!";
    }
    if (days === 365) {
      return "A full year of tracking - incredible dedication!";
    }
    return `You've tracked for ${days} days!`;
  }

  /**
   * Get day milestone icon
   * @param {number} days - Number of days
   * @returns {string} Icon name
   */
  getDayMilestoneIcon(days) {
    if (days >= 100) return "diamond";
    if (days >= 30) return "trophy";
    if (days >= 21) return "flame";
    if (days >= 7) return "star";
    return "checkmark-circle";
  }

  /**
   * Get rarity level
   * @param {number} days - Number of days
   * @returns {string} Rarity
   */
  getRarity(days) {
    if (days >= 100) return "legendary";
    if (days >= 30) return "epic";
    if (days >= 14) return "rare";
    return "common";
  }
}

export default new AchievementRecognizer();

