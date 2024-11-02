export const mockTasks = [
    {
      id: "1",
      title: "Complete project report",
      description: "Write the final report for the project and submit it by the end of the day.",
      priority: 0.2,
      createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    },
    {
      id: "2",
      title: "Team meeting preparation",
      description: "Prepare the agenda and materials for the weekly team meeting.",
      priority: 0.4,
      createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    },
    {
      id: "3",
      title: "Code review",
      description: "Review the latest pull requests on the repository.",
      priority: 0.7,
      createdAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    },
    {
      id: "4",
      title: "Design review",
      description: "Check the new design proposals and provide feedback to the design team.",
      priority: 0.1,
      createdAt: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    },
    {
      id: "5",
      title: "Client call follow-up",
      description: "Send a follow-up email with additional details to the client after the call.",
      priority: 0.8,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    },
    {
      id: "6",
      title: "Implement feature X",
      description: "Work on implementing feature X for the upcoming release.",
      priority: 0.5,
      createdAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
    },
  ]