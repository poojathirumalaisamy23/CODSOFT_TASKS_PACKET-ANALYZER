const questions = [
    {
        q: "You receive an email from 'support@paypa1.com' asking you to verify your account immediately. What do you do?",
        options: [
            "Click the link and log in quickly",
            "Delete the email — it's phishing (notice the '1' instead of 'l')",
            "Reply asking for clarification",
            "Forward it to your friends to warn them"
        ],
        answer: 1,
        explanation: "The domain is 'paypa1.com' — with the digit '1' replacing the letter 'l'. This is a classic typosquatting attack. Legitimate PayPal emails always come from @paypal.com."
    },
    {
        q: "Which of these URLs is the real PayPal login page?",
        options: [
            "paypal.secure-login.xyz",
            "www.paypal.com",
            "paypal-verification.net",
            "login-paypal.co"
        ],
        answer: 1,
        explanation: "The real domain must end with 'paypal.com'. Subdomains like 'paypal.secure-login.xyz' belong to a different domain (secure-login.xyz). Look for the domain right before the first '/'."
    },
    {
        q: "An email says: 'Your account will be permanently closed in 2 hours unless you act now.' This is:",
        options: [
            "Normal security practice",
            "A red flag — urgency pressure is a classic phishing tactic",
            "Great customer service",
            "Just a friendly reminder"
        ],
        answer: 1,
        explanation: "Urgency + threats are the #1 phishing tactic. Real companies don't pressure you to act within hours. If you're worried, contact the company directly through their official app or website."
    },
    {
        q: "What does 2FA (Two-Factor Authentication) protect you from if your password is stolen?",
        options: [
            "Nothing — the attacker has your password",
            "Unauthorized login without the second factor (OTP, app, hardware key)",
            "Slow internet speeds",
            "Email spam"
        ],
        answer: 1,
        explanation: "Even if an attacker steals your password, they still need the second factor (SMS code, authenticator app, or hardware key) to log in. Always enable 2FA on email, banking, and work accounts."
    },
    {
        q: "You get an unexpected invoice attachment (.zip) from a vendor you work with. Best action?",
        options: [
            "Open it immediately — invoices are normal",
            "Verify via a known phone number before opening",
            "Forward it to accounting without checking",
            "Reply with your bank account details"
        ],
        answer: 1,
        explanation: "Business Email Compromise (BEC) often uses fake invoices. Always verify with the sender through a known phone number — not a number in the email. Malicious .zip files often contain malware."
    },
    {
        q: "You receive an SMS: 'Your parcel is delayed. Pay ₹50 customs fee here: bit.ly/xyz123'. What do you do?",
        options: [
            "Click the link and pay — it's only ₹50",
            "Ignore/delete the SMS — it's smishing",
            "Reply to the SMS asking for details",
            "Forward it to friends to warn them"
        ],
        answer: 1,
        explanation: "Smishing = phishing via SMS. Shortened links (bit.ly) hide the real destination. Couriers never ask for payment via SMS links. Track parcels only through the courier's official app or website."
    },
    {
        q: "You get a LinkedIn message from a 'recruiter' asking you to download a file for a job opportunity. Best action?",
        options: [
            "Download it — recruiters send files all the time",
            "Verify the recruiter's profile and company before clicking anything",
            "Send your resume and personal details immediately",
            "Send them your bank account for salary setup"
        ],
        answer: 1,
        explanation: "Fake recruiters are a growing threat. Check the profile — do they have a history? Is the company real? Never open unexpected files. Real recruiters use official company email and standard platforms."
    },
    {
        q: "A popup on a website says: 'Your PC is infected! Call Microsoft Support at 1-800-XXX-XXXX now.' This is:",
        options: [
            "Real Microsoft warning — call immediately",
            "A tech support scam — close the browser tab",
            "A helpful browser notification",
            "Windows Defender alert"
        ],
        answer: 1,
        explanation: "Microsoft never shows popups asking you to call. This is a 'scareware' / tech support scam. Close the browser tab or force-quit the browser. Never call the number."
    },
    {
        q: "Which of these is the STRONGEST indicator that an email is phishing?",
        options: [
            "It uses a company logo",
            "The 'From' address has a slight typo but the display name looks real",
            "It has a signature at the bottom",
            "It was sent during business hours"
        ],
        answer: 1,
        explanation: "Display names are easy to fake — you can set any name in any mail client. The real 'From' email address is what matters. Attackers use tricks like 'Micros0ft Support <attacker@evil.com>'."
    },
    {
        q: "You accidentally clicked a phishing link and entered your password. What should you do FIRST?",
        options: [
            "Nothing — wait and see what happens",
            "Immediately change that password on the real site + enable 2FA",
            "Delete the email and forget about it",
            "Reply to the phishing email asking them to delete your data"
        ],
        answer: 1,
        explanation: "Speed matters. Change the password immediately from a trusted device, enable 2FA, and check for any unauthorized activity. If you reuse that password elsewhere — change it everywhere. Report to IT/security if it's a work account."
    }
];

const container = document.getElementById('quiz-container');

questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-q';
    div.innerHTML =
        `<p>${i + 1}. ${q.q}</p>` +
        q.options.map((opt, j) =>
            `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label>`
        ).join('') +
        `<div class="explanation" id="exp-${i}" style="display:none;"></div>`;
    container.appendChild(div);
});

document.getElementById('submit-quiz').addEventListener('click', () => {
    let score = 0;
    let answered = 0;

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const expDiv = document.getElementById(`exp-${i}`);
        const labelDivs = document.querySelectorAll(`input[name="q${i}"]`);

        // Reset highlighting
        labelDivs.forEach(inp => {
            inp.parentElement.style.background = '';
            inp.parentElement.style.borderLeft = '';
        });

        if (selected) {
            answered++;
            const userAnswer = parseInt(selected.value);

            if (userAnswer === q.answer) {
                score++;
                selected.parentElement.style.background = 'rgba(35, 134, 54, 0.25)';
                selected.parentElement.style.borderLeft = '4px solid #238636';
                expDiv.className = 'explanation correct';
                expDiv.innerHTML = `<strong>✅ Correct.</strong> ${q.explanation}`;
            } else {
                selected.parentElement.style.background = 'rgba(218, 54, 51, 0.25)';
                selected.parentElement.style.borderLeft = '4px solid #da3633';

                // Highlight the correct answer
                labelDivs[q.answer].parentElement.style.borderLeft = '4px solid #238636';

                expDiv.className = 'explanation wrong';
                expDiv.innerHTML =
                    `<strong>❌ Incorrect.</strong> The correct answer is highlighted in green.<br><br>` +
                    `<strong>Why:</strong> ${q.explanation}`;
            }
            expDiv.style.display = 'block';
        } else {
            expDiv.className = 'explanation wrong';
            expDiv.innerHTML = `<strong>⚠️ Not answered.</strong> ${q.explanation}`;
            expDiv.style.display = 'block';
        }
    });

    if (answered < questions.length) {
        alert(`You answered ${answered}/${questions.length} questions. Unanswered questions are shown below with explanations.`);
    }

    const result = document.getElementById('quiz-result');
    const percent = Math.round((score / questions.length) * 100);

    let verdict = '';
    let cls = '';

    if (percent >= 90) {
        verdict = '🏆 Excellent! You are phishing-aware.';
        cls = 'pass';
    } else if (percent >= 70) {
        verdict = '👍 Good job — review the missed ones below.';
        cls = 'pass';
    } else if (percent >= 50) {
        verdict = '⚠️ Fair — study the explanations below carefully.';
        cls = 'fail';
    } else {
        verdict = '🚨 High risk — please re-read the tips above.';
        cls = 'fail';
    }

    result.className = cls;
    result.innerHTML = `You scored <strong>${score}/${questions.length}</strong> (${percent}%)<br>${verdict}`;
    result.scrollIntoView({ behavior: 'smooth' });
});