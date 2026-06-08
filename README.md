# 📅 Course Calendar

A simple, easy-to-read calendar application to track course deadlines and important dates.

## Features

✅ **Interactive Calendar** - Navigate between months with easy-to-use buttons  
✅ **Event Tracking** - View all TMAs, iCMA, and tutorial dates  
✅ **Color-Coded Events** - Different colors for different event types  
✅ **Upcoming Events List** - See all upcoming events at a glance  
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
✅ **Today Highlight** - Current date is highlighted for easy reference  

## Important Dates

### Assignments (TMA)
- **TMA 01** - August 19, 2026
- **TMA 02** - October 14, 2026
- **TMA 03** - December 9, 2026

### Exam
- **iCMA 41** - January 13, 2027

### Tutorials
- June 23, 2026
- June 30, 2026
- July 7, 2026
- August 4, 2026

## How to Use

1. Open `index.html` in your web browser
2. Use the **Previous** and **Next** buttons to navigate between months
3. Events are highlighted in the calendar with color coding:
   - 🔴 Red - TMA Submissions
   - 🔵 Blue - iCMA Exams
   - 🟢 Green - Tutorials
4. View all upcoming events in the **Upcoming Events** section below the calendar

## File Structure

```
calendar/
├── index.html      # HTML structure
├── styles.css      # Styling and layout
├── script.js       # Calendar logic and interactivity
└── README.md       # This file
```

## Customization

To add or modify events, edit the `events` array in `script.js`:

```javascript
const events = [
    { date: new Date(2026, 7, 19), title: 'TMA 01 Submission', type: 'tma' },
    // Add more events here
];
```

Event types:
- `tma` - Red/Pink color
- `icma` - Blue color
- `tutorial` - Green color

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge)

---

**Created for easy course date tracking** 📚
