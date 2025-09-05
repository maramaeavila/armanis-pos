class MembersManager {
  constructor() {
    this.members = [];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .getElementById("addMemberBtn")
      ?.addEventListener("click", () => this.openMemberModal());

    document
      .getElementById("closeMemberModal")
      ?.addEventListener("click", () => this.closeMemberModal());
    document
      .getElementById("cancelMember")
      ?.addEventListener("click", () => this.closeMemberModal());
    document
      .getElementById("memberForm")
      ?.addEventListener("submit", (e) => this.handleMemberSubmit(e));

    document
      .getElementById("memberSearchInput")
      ?.addEventListener("input", (e) => {
        this.handleMemberSearch(e.target.value);
      });
  }

  async loadMembers() {
    try {
      this.members = await db.getMembers();
      this.displayMembers();
    } catch (error) {
      console.error("Failed to load members:", error);
      this.members = window.sampleData.members;
      this.displayMembers();
    }
  }

  displayMembers(membersToShow = null) {
    const grid = document.getElementById("membersGrid");
    if (!grid) return;

    const members = membersToShow || this.members;

    if (members.length === 0) {
      grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-light);">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No members found</p>
                </div>
            `;
      return;
    }

    grid.innerHTML = members
      .map(
        (member) => `
            <div class="member-card">
                <div class="member-avatar">
                    ${member.first_name.charAt(0)}${member.last_name.charAt(0)}
                </div>
                <div class="member-name">${member.first_name} ${
          member.last_name
        }</div>
                <div class="member-info">
                    <div>ID: ${member.member_id}</div>
                    <div>Email: ${member.email}</div>
                    <div>Phone: ${member.phone}</div>
                    <div>Joined: ${new Date(
                      member.join_date
                    ).toLocaleDateString()}</div>
                </div>
                <div class="member-status ${member.status}">${
          member.status
        }</div>
            </div>
        `
      )
      .join("");
  }

  openMemberModal() {
    document.getElementById("memberModal").classList.add("show");
  }

  closeMemberModal() {
    document.getElementById("memberModal").classList.remove("show");
    document.getElementById("memberForm").reset();
  }

  async handleMemberSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const memberData = {
      first_name: document.getElementById("memberFirstName").value,
      last_name: document.getElementById("memberLastName").value,
      email: document.getElementById("memberEmail").value,
      phone: document.getElementById("memberPhone").value,
      emergency_contact: document.getElementById("memberEmergencyContact")
        .value,
    };

    try {
      const result = await db.createMember(memberData);

      if (result.success) {
        this.members.push(result.member);
        this.displayMembers();
        this.closeMemberModal();
        this.showSuccessMessage("Member added successfully!");
      } else {
        throw new Error(result.message || "Failed to create member");
      }
    } catch (error) {
      console.error("Failed to create member:", error);
      alert("Failed to add member: " + error.message);
    }
  }

  handleMemberSearch(query) {
    if (!query.trim()) {
      this.displayMembers();
      return;
    }

    const filtered = this.members.filter(
      (member) =>
        member.first_name.toLowerCase().includes(query.toLowerCase()) ||
        member.last_name.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.member_id.toLowerCase().includes(query.toLowerCase())
    );

    this.displayMembers(filtered);
  }

  showSuccessMessage(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

window.membersManager = new MembersManager();
