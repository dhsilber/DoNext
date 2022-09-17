# Do Next

*Do Next* will show me the available time in my schedule and the tasks and projects that I might use that time for.

It currently shows my routine, events, and todo list. These are all stored in the browser's local storage, so they are instantly available when the app is reloaded. This data can be loaded them from files and downloaded as well.

It does not yet:
- show/track projects
- highlight next tasks
- show events from my Google calendar

The repeating tasks are all about building habits. 
It feels good to check them off my list every day, but ideally I'll do them even without the reminders.

Other tasks are difficult.
I (like many people) have a huge pile of things I would like to get done.
A simple prioritization doesn't really cut it.
Many tasks / projects are things that are constrained in some way.
(E.g. appointment for vision test must be made during business hours.)
Tasks which are not eligible for doing right now should not be competing for my attention with other tasks.
OTOH, things that block tasks might themselves be tasks. ("Buy nails for birdhouse project")

To start: `npm start`
To test: `npm test`

I skimped on the testing of the storage because it is a hard problem.
Testing that code would be very useful, but first I want to see that the project has the merit of being more useful to me than other solutions.

Next things for this app are:
- Filter todo items by day of week
- Filter todo items by day of month
- Display Google Calendar Events for today
- *DoNext* should know work hours and highlight conflicts between calendar events and work hours
