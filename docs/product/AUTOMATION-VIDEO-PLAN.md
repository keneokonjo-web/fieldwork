# Automations walkthrough video: revision plan, voice-over script and sound plan

Status: **plan only.** The video has not been re-made yet. The next step is for the founder to generate the voice-over in ElevenLabs from the script in section 4 and upload the audio files. The video is then rebuilt to match the audio, and music and sound effects are added.

## 1. Feedback to apply (everything the founder asked for)

**Quality**
- The current video looks blurry. Cause: it was recorded in real time at 1280×720 with a low-bitrate encoder, then shown full-screen on a 1440px-or-wider screen, so it is enlarged and soft. Fix: render at 1920×1080 with a 2× pixel density (so text is sharp), capture frame by frame (not in real time) at 30 fps, and encode with a high-quality setting (H.264, CRF about 16, plus a VP9 copy). Frame-by-frame rendering also makes the picture follow the audio exactly.

**Everything looks too simplified, so make every screen look like real, professional software**
1. **Enquiry (scene 1):** replace "name, email, message" with the enquiry form from the Halden demo website: Book a viewing / Enquire tabs, name, email, phone, preferred day, message, consent tick-box, "Request viewing" button, shown inside a browser window on a property page. Keep the lead list (CRM or shared sheet) as it is.
2. **Remove** the "Checked → recorded → in the list" text that overlaps other elements.
3. **Scene 2 title:** change "They hear back at once" to **"Instant automated reply."**
   - Show a **realistic email** (mail-client chrome, sender, subject, branded body with the property photo and details, signature, footer).
   - Add a **phone showing a text message in an iMessage style** that says the enquiry was received and an agent will be in touch shortly.
   - Email and phone appear together.
4. **Scene 3 (agent notified):** keep, with slightly richer detail.
5. **Scene 4 (viewing) was confusing.** Make it clear: the agent confirms the viewing, then a *second* message goes to the buyer, and it is just one click ("Confirm viewing").
   - Show the agent's one-click confirm.
   - Show an iMessage-style thread: "Your viewing is confirmed" with the date, time, address and agent; the buyer replies "Perfect, thank you!"; then, a day later (new date stamp), a reminder message.
   - Optionally also show an email version with a calendar invite.
6. **Scene 5 (feedback):** the stars-plus-box form looks low-end. Make the form detailed and professional: overall rating, ratings for property, location, value and agent, "what did you like" chips, how the price felt, a next-step choice (second viewing, make an offer, see similar homes, not for me), comments, preferred contact method. Show it arriving by a text or email prompt first.
   - Keep the "Feedback received" card for the agent.
7. **End card:** keep.
8. **Audio:** add a voice-over (ElevenLabs), very quiet low-key background music, and small sound effects (typing, send, message pop, notification, confirm), added after the voice is in.

## 2. Creative direction (our choices)
- Same Fieldwork look (paper, ink, cobalt, mono labels) around realistic product screens, so it reads as premium and credible.
- Phones are drawn as modern devices with an iMessage-style thread: grey incoming bubbles, blue outgoing bubbles, timestamps, "Delivered", and a day-change divider.
- Smooth, slow camera-style moves (gentle zooms and slides). One idea per scene. Numbers and people are fictional and the video says so.
- Honest content only: nothing implies a live product that does not exist yet. The end card keeps the "illustrative" line.

## 3. Storyboard and target timings
Timings are targets. The final cut follows the length of each uploaded audio file, and the picture waits for the voice.

| Scene | Time | On screen |
|---|---|---|
| S0 Intro | 0–6 s | Title "Lead capture & viewings" and halftone dots |
| S1 Enquiry | 6–19 s | Browser on a property page; the form is filled in and sent; the row appears in the lead list |
| S2 Instant automated reply | 19–31 s | Email opens (left) and iMessage-style text arrives on a phone (right) |
| S3 Agent notified | 31–41 s | Agent notification and the follow-up task |
| S4 Viewing confirmed and reminded | 41–57 s | Agent clicks Confirm; phone thread shows the confirmation, the buyer's reply, then the next-day reminder; calendar invite chip |
| S5 Feedback | 57–70 s | Feedback prompt by text; detailed form filled in; "Feedback received" card for the agent |
| S6 End | 70–79 s | End card |

## 4. ElevenLabs script (one single generation)

Paste the block below into ElevenLabs once and generate one audio file. Upload that one file here. The long pauses (1.5 seconds) between scenes let the file be cut into scenes automatically, so the picture can be timed to the voice.

**Voice:** calm, warm, confident and professional, British English. **Suggested settings:** Multilingual v2, stability about 50, similarity about 75, style 0 to 15, speed 1.0.

```
Every enquiry. <break time="0.4s" /> Every viewing. <break time="0.5s" /> Handled, from the first message to the last.

<break time="1.5s" />

It starts with an enquiry. <break time="0.4s" /> A buyer asks to view a property on your website, and the details are recorded straight away, <break time="0.3s" /> in your CRM, or a shared sheet.

<break time="1.5s" />

Within seconds, they hear back. <break time="0.4s" /> An approved reply goes out by email, and by text message, in your wording, <break time="0.3s" /> so nobody is left wondering.

<break time="1.5s" />

The right agent is notified at the same moment, <break time="0.3s" /> and a follow-up is created, so nothing depends on someone remembering.

<break time="1.5s" />

Your agent confirms the viewing in one click. <break time="0.4s" /> Only then is the buyer told, with the date, the time and the address. <break time="0.4s" /> A reminder follows the day before.

<break time="1.5s" />

After the viewing, a short feedback form goes out. <break time="0.4s" /> The answers reach your agent, with a prompt to follow up while the interest is fresh.

<break time="1.5s" />

Every enquiry recorded. <break time="0.4s" /> Every viewing confirmed. <break time="0.5s" /> Fixed price, set up on your own accounts, beside your CRM. <break time="0.6s" /> Fieldwork.
```

If the model ignores or reads out the break tags, use this version instead and leave a blank line between scenes (ElevenLabs pauses a little at a paragraph break):

```
Every enquiry. Every viewing. Handled, from the first message to the last.

It starts with an enquiry. A buyer asks to view a property on your website, and the details are recorded straight away, in your CRM, or a shared sheet.

Within seconds, they hear back. An approved reply goes out by email, and by text message, in your wording, so nobody is left wondering.

The right agent is notified at the same moment, and a follow-up is created, so nothing depends on someone remembering.

Your agent confirms the viewing in one click. Only then is the buyer told, with the date, the time and the address. A reminder follows the day before.

After the viewing, a short feedback form goes out. The answers reach your agent, with a prompt to follow up while the interest is fresh.

Every enquiry recorded. Every viewing confirmed. Fixed price, set up on your own accounts, beside your CRM. Fieldwork.
```

Total spoken length: about 65 seconds of speech plus the pauses, so roughly 75 seconds. The finished video will run about 80 seconds.

## 5. Sound plan (after the voice is uploaded)
- **Music:** a very quiet, low-key ambient bed (soft pad and gentle pulse), mixed about 20 dB under the voice, fading in at the start and out at the end. Created as an original piece so there are no licensing issues. If a licensed track is preferred, upload it and it will be used instead.
- **Sound effects (small and soft):** keyboard ticks while forms are typed, a send "whoosh", a message pop and an email chime, an agent notification ping, a confirm click, and a soft success tone on the feedback card.
- **Mix:** voice at the front, effects tucked under it, music underneath. Loudness normalised so it is comfortable on a phone.

## 6. Build steps once the audio arrives
1. Measure each audio file and set each scene's length to its line plus a short breathing space.
2. Rebuild the scene file (`scripts/video/walkthrough.html`) with the new screens and a controllable clock.
3. Render frame by frame at 1920×1080 (2× pixel density), then encode MP4 and WebM.
4. Add the voice, music and effects with ffmpeg, and update the chapter times used by the video player on the Automations page.
5. Check the picture against the audio, and that nothing overlaps or clips.
