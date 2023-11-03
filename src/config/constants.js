const constants = {
  status: {
    pending: "PENDING",
    approved: "APPROVED",
    published: "PUBLISHED",
    draft: "DRAFT",
    suspended: "SUSPENDED",

    block: "BLOCK",
    decline: "DECLINE",

    private: "PRIVATE",
    public: "PUBLIC",
  },
  roles: {
    admin: "ADMIN",
    user: "USER",
    editor: "EDITOR",
    manager: "MANAGER",
  },

  ref: {
    user: "User",
    post: "Post",
    comment: "Comment",
  },
  verifyStatus: {
    verify: true,
    unverified: false,
  },
};

module.exports = constants;
