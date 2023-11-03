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
};

module.exports = constants;
