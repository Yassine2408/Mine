document.addEventListener('DOMContentLoaded', function() {
    // Create falling hearts
    createFallingHearts();
    
    // Add hover effect to polaroids
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseover', function() {
            this.style.zIndex = '100';
        });
        
        polaroid.addEventListener('mouseout', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Audio player functionality
    const audioPlayer = document.getElementById('love-song');
    const playButton = document.getElementById('play-button');
    const playIcon = playButton.querySelector('i');
    const playText = playButton.querySelector('span');
    
    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-music');
            playButton.classList.add('playing');
            playText.textContent = 'إيقاف الأغنية';
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('fa-music');
            playIcon.classList.add('fa-play');
            playButton.classList.remove('playing');
            playText.textContent = 'تشغيل الأغنية';
        }
    });
});

function createFallingHearts() {
    const container = document.querySelector('.falling-hearts');
    const heartColors = ['#ff6b6b', '#ff9999', '#ffb3b3', '#ffd3d3', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'falling-heart';
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        
        // Apply styles
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = size + 'px';
        heart.style.color = color;
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.animationDuration = Math.random() * 15 + 10 + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        // Add animation
        heart.style.animation = `fall ${Math.random() * 15 + 10}s linear infinite`;
        
        // Add to container
        container.appendChild(heart);
    }
    
    // Add keyframes for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            0% {
                transform: translateY(-10vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .falling-heart {
            position: absolute;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
}

// Add special effects when the page loads
window.addEventListener('load', function() {
    // Animate the title with a special effect
    const title = document.querySelector('.title');
    title.style.animation = 'fadeIn 2s ease, pulse 2s infinite 2s';
    
    // Add a click event to the envelope
    const envelope = document.querySelector('.envelope');
    envelope.addEventListener('click', function() {
        this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
    
    // Add a message that appears after a delay
    setTimeout(function() {
        const message = document.createElement('div');
        message.className = 'special-message';
        message.innerHTML = '<p>انقر على الظرف لقراءة القصيدة</p>';
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(255, 255, 255, 0.9)';
        message.style.padding = '1rem';
        message.style.borderRadius = '10px';
        message.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        message.style.zIndex = '100';
        message.style.animation = 'fadeIn 1s ease';
        
        document.querySelector('.card').appendChild(message);
        
        // Remove the message after 5 seconds
        setTimeout(function() {
            message.style.animation = 'fadeOut 1s ease forwards';
            setTimeout(function() {
                message.remove();
            }, 1000);
        }, 5000);
    }, 2000);
    
    // Add keyframes for fadeOut animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -70%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Auto-play background music with a slight delay (if allowed by browser)
    setTimeout(function() {
        const audioPlayer = document.getElementById('love-song');
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Playback started successfully
                const playButton = document.getElementById('play-button');
                const playIcon = playButton.querySelector('i');
                const playText = playButton.querySelector('span');
                
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-music');
                playButton.classList.add('playing');
                playText.textContent = 'إيقاف الأغنية';
            })
            .catch(error => {
                // Auto-play was prevented
                console.log("Auto-play prevented by browser");
            });
        }
    }, 1000);
}); 