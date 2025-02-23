<script>
    let rotationX = 0;
    let rotationY = 0;

    function handleMouseMove(event) {
        const { clientX, clientY, currentTarget } = event;
        const { width, height, left, top } =
            currentTarget.getBoundingClientRect();

        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        rotationX = -y * 30; // Rotate vertically
        rotationY = x * 30; // Rotate horizontally
    }

    function handleMouseLeave() {
        rotationX = 0;
        rotationY = 0;
    }
</script>

<div class="card-container">
    <div
        class="card"
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        style="transform: rotateX({rotationX}deg) rotateY({rotationY}deg);"
    >
        Hover me!
    </div>
</div>

<style>
    .card-container {
        perspective: 1000px;
    }

    .card {
        width: 200px;
        height: 300px;
        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>
