/**
 * Motivational Insights Service
 * Generates personalized motivational messages based on progress
 */
class MotivationalInsights {
  /**
   * Generate motivational insights
   * @param {Array} entries - Array of habit entries
   * @param {Object} habit - Habit object
   * @returns {Object} Motivational insights
   */
  async generate(entries, habit) {
    if (!Array.isArray(entries) || entries.length === 0) {
      return {
        message: "Every journey begins with a single step. Start tracking today!",
        type: "encouragement",
        icon: "rocket",
      };
    }

    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    const insights = {
      primary: this.getPrimaryMessage(sortedEntries, habit),
      secondary: this.getSecondaryMessages(sortedEntries, habit),
      quotes: this.getRelevantQuotes(sortedEntries),
    };

    return insights;
  }

  /**
   * Get primary motivational message
   * @param {Array} sortedEntries - Sorted entries
   * @param {Object} habit - Habit object
   * @returns {Object} Primary message
   */
  getPrimaryMessage(sortedEntries, habit) {
    const uniqueDays = new Set(
      sortedEntries.map((e) => {
        const d = new Date(e.createdAt || e.date);
        return d.toDateString();
      })
    ).size;

    // Milestone messages
    if (uniqueDays >= 365) {
      return {
        message: "A full year of dedication! You're a true habit master! 🎊",
        type: "celebration",
        icon: "trophy",
        emoji: "🎊",
      };
    }

    if (uniqueDays >= 100) {
      return {
        message: "100 days! You've transformed this into a lifestyle! 💯",
        type: "celebration",
        icon: "diamond",
        emoji: "💯",
      };
    }

    if (uniqueDays >= 30) {
      return {
        message: "One month strong! You're building something amazing! 🏆",
        type: "success",
        icon: "trophy",
        emoji: "🏆",
      };
    }

    if (uniqueDays >= 21) {
      return {
        message: "Habit formed! Research shows you've crossed the 21-day threshold! 🔥",
        type: "success",
        icon: "flame",
        emoji: "🔥",
      };
    }

    if (uniqueDays >= 14) {
      return {
        message: "Two weeks down! You're making this a real habit! ⭐",
        type: "encouragement",
        icon: "star",
        emoji: "⭐",
      };
    }

    if (uniqueDays >= 7) {
      return {
        message: "One week complete! Keep this momentum going! 💪",
        type: "encouragement",
        icon: "checkmark-circle",
        emoji: "💪",
      };
    }

    // Recent activity messages
    const lastEntryDate = new Date(sortedEntries[0].createdAt || sortedEntries[0].date);
    const hoursSinceLast = (new Date() - lastEntryDate) / (1000 * 60 * 60);

    if (hoursSinceLast < 24) {
      return {
        message: "Great job tracking today! Consistency is key to success! ✨",
        type: "encouragement",
        icon: "sparkles",
        emoji: "✨",
      };
    }

    return {
      message: "You're on the right track! Every entry counts toward your goal! 🌱",
      type: "encouragement",
      icon: "leaf",
      emoji: "🌱",
    };
  }

  /**
   * Get secondary motivational messages
   * @param {Array} sortedEntries - Sorted entries
   * @param {Object} habit - Habit object
   * @returns {Array} Secondary messages
   */
  getSecondaryMessages(sortedEntries, habit) {
    const messages = [];
    const uniqueDays = new Set(
      sortedEntries.map((e) => {
        const d = new Date(e.createdAt || e.date);
        return d.toDateString();
      })
    ).size;

    // Consistency messages
    const last7Days = sortedEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt || entry.date);
      const daysAgo = (new Date() - entryDate) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7;
    });

    const recentUniqueDays = new Set(
      last7Days.map((e) => {
        const d = new Date(e.createdAt || e.date);
        return d.toDateString();
      })
    ).size;

    if (recentUniqueDays >= 6) {
      messages.push({
        message: "Amazing consistency this week! You're unstoppable!",
        type: "success",
        icon: "flame",
      });
    }

    // Progress messages
    if (uniqueDays >= 3 && uniqueDays < 7) {
      messages.push({
        message: "You're building momentum! Keep going and you'll form a strong habit!",
        type: "encouragement",
        icon: "trending-up",
      });
    }

    // Streak messages
    const currentStreak = this.calculateStreak(sortedEntries);
    if (currentStreak >= 7) {
      messages.push({
        message: `${currentStreak}-day streak! Your dedication is inspiring!`,
        type: "celebration",
        icon: "flame",
      });
    }

    return messages;
  }

  /**
   * Get relevant motivational quotes
   * @param {Array} sortedEntries - Sorted entries
   * @returns {Array} Quote objects
   */
  getRelevantQuotes(sortedEntries) {
    const uniqueDays = new Set(
      sortedEntries.map((e) => {
        const d = new Date(e.createdAt || e.date);
        return d.toDateString();
      })
    ).size;

    const quotes = [
      {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle",
      },
      {
        text: "Small steps every day lead to big changes over time.",
        author: "Unknown",
      },
      {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain",
      },
      {
        text: "Success is the sum of small efforts repeated day in and day out.",
        author: "Robert Collier",
      },
    ];

    // Return different quotes based on progress
    if (uniqueDays >= 21) {
      return [quotes[0]]; // Excellence quote for established habits
    } else if (uniqueDays >= 7) {
      return [quotes[1]]; // Small steps for developing habits
    } else {
      return [quotes[2]]; // Getting started for new habits
    }
  }

  /**
   * Calculate current streak
   * @param {Array} sortedEntries - Sorted entries (newest first)
   * @returns {number} Current streak
   */
  calculateStreak(sortedEntries) {
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
}

export default new MotivationalInsights();

