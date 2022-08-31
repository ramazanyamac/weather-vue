<template>
    <i class="spinner"></i>
</template>

<style lang="scss">
.spinner {
    width: 22px;
    height: 22px;
    clear: both;
    border: 3px rgba(#fff, 0.25) solid;
    border-top: 3px rgba(#fff, 1) solid;
    border-radius: 50%;
    -webkit-animation: spCircRot 0.6s infinite linear;
    animation: spCircRot 0.6s infinite linear;
}

@keyframes spCircRot {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>
