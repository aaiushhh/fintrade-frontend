Design the **Student and Teacher Web Application UI** for FinTrade.

This is accessed AFTER login from the website.

Do NOT redesign the website or admin panel.
This is the internal product interface.

---

====================================
CRITICAL REQUIREMENTS
=====================

• Create FULL flows, not just dashboards
• Every page must be fully designed (no empty screens)
• All buttons must lead to proper screens
• Navigation must be connected across all sections
• UI must feel like a real working product

---

====================================
RESPONSIVE DESIGN
=================

• desktop-first
• tablet collapses sidebar
• mobile stacked layout

---

====================================
BRAND STYLE
===========

Use same system:

Primary: #E53935 (Red)
Secondary: #121212 (Black)
Background: #F5F5F5

Use subtle glow on:

• active items
• charts
• buttons

---

====================================
STUDENT SYSTEM (FULL FLOW)
==========================

FLOW:

Entrance Exam → Course → Modules → Lectures → AI Tutor → Exams → Performance → Certificate → Simulator → Placement

---

====================================
STUDENT SIDEBAR
===============

Dashboard
Modules
Lectures
AI Tutor
Exams
Performance
Certificate
Trading Simulator
Placement

---

====================================
STUDENT DASHBOARD
=================

Widgets:

• Learning Progress
• Next Lecture
• Exam Status
• Performance Score

Buttons:

• Continue Learning → opens Modules
• Join Next Lecture → opens Lecture page
• View Performance → opens analytics

---

====================================
MODULES PAGE
============

Cards:

• Trading Foundations
• Technical Analysis
• Risk Management
• Trading Psychology
• Strategy Development

Each shows:

• progress %
• lectures count

Buttons:

• Start Module → opens Lecture

---

====================================
LECTURE PAGE
============

Layout:

• video player
• notes
• resources
• discussion

Right panel:

• module progress
• next lecture

Buttons:

• Mark Complete → updates progress
• Next Lecture → opens next video
• Ask AI Tutor → opens AI chat

---

====================================
AI TUTOR (IMPORTANT LOGIC)
==========================

Chat interface.

Flow:

• Normal doubt → AI answers
• Common doubt → AI shows video suggestions
• Hard doubt → escalation

When escalated:

Show:

“This doubt will be handled in a live session.”

Button:

Join Session → opens doubt session page

---

====================================
EXAMS PAGE
==========

Cards:

Month 1 / Month 2 / Month 3

Each shows:

• score
• attempts
• status

Buttons:

• Start Exam → opens exam UI
• Retake Exam → opens payment → retry

---

====================================
EXAM INTERFACE
==============

• questions
• options
• timer
• navigation panel

Buttons:

Next
Previous
Submit

---

====================================
PERFORMANCE PAGE
================

Charts:

• radar chart
• trend graph

Sections:

• strengths
• weaknesses

---

====================================
CERTIFICATE PAGE
================

• certificate card
• student name

Button:

Download Certificate

---

====================================
TRADING SIMULATOR
=================

Full trading UI:

• candlestick chart
• buy/sell panel
• trade history
• P&L

Show:

• capital ₹5,00,000
• daily loss limit

---

====================================
PLACEMENT PAGE
==============

• eligibility status
• performance score

Message:

“If eligible, your profile will be shared with trading firms.”

---

====================================
TEACHER SYSTEM
==============

ROLE:

Teacher = Tutor (not admin)

---

====================================
TEACHER SIDEBAR
===============

Dashboard
Students
Lectures
Doubt Sessions
Exams
Reports

---

====================================
TEACHER DASHBOARD
=================

Widgets:

• Active Students
• Upcoming Lectures
• Pending Doubts
• Avg Scores

Buttons:

• View Students
• Start Session

---

====================================
STUDENTS PAGE (TEACHER)
=======================

Table:

• name
• city
• course
• progress
• exam score

Buttons:

• View Student → opens profile

Teacher can only VIEW.

---

====================================
LECTURES (TEACHER)
==================

List:

• live lectures
• recorded lectures

Buttons:

• Start Lecture
• Upload Notes
• View Recording

---

====================================
DOUBT SESSIONS (IMPORTANT)
==========================

List:

• topic
• students
• date

Buttons:

• Join Session → opens session
• Mark Resolved

---

====================================
EXAMS (TEACHER)
===============

Teacher can EDIT exams.

UI:

• question list
• options
• correct answer

Buttons:

• Add Question
• Edit Question
• Save Changes

---

====================================
REPORTS (TEACHER)
=================

Charts:

• student performance
• weak topics

---

====================================
INTERACTIONS (MANDATORY)
========================

Ensure:

• sidebar navigation works
• all buttons lead somewhere
• flows are connected
• no dead screens

---

====================================
FINAL FEEL
==========

"real trading education SaaS product used daily by users"

NOT:

• dashboard-only UI
• empty pages
• broken flows
