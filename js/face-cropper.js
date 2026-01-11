// Face detection and auto-crop utility for member avatars
class FaceCropper {
    constructor() {
        this.modelsLoaded = false;
        this.modelUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/';
        this.init();
    }

    async init() {
        try {
            await this.loadModels();
            this.modelsLoaded = true;
            console.log('FaceCropper: Models loaded successfully');
        } catch (error) {
            console.error('FaceCropper: Error loading models:', error);
        }
    }

    async loadModels() {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(this.modelUrl),
            faceapi.nets.faceLandmark68Net.loadFromUri(this.modelUrl)
        ]);
    }

    async cropImageToFace(imgElement, containerElement) {
        if (!this.modelsLoaded) {
            console.warn('FaceCropper: Models not loaded yet, using default center positioning');
            return;
        }

        try {
            const detections = await faceapi.detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections) {
                const box = detections.detection.box;
                const imgWidth = imgElement.naturalWidth;
                const imgHeight = imgElement.naturalHeight;
                
                const centerX = box.x + box.width / 2;
                const centerY = box.y + box.height / 2;
                
                const xPercent = (centerX / imgWidth) * 100;
                const yPercent = (centerY / imgHeight) * 100;
                
                imgElement.style.objectPosition = `${xPercent}% ${yPercent}%`;
                console.log(`FaceCropper: Adjusted image position to ${xPercent.toFixed(1)}% ${yPercent.toFixed(1)}%`);
            } else {
                console.log('FaceCropper: No face detected, using default center positioning');
                imgElement.style.objectPosition = 'center top';
            }
        } catch (error) {
            console.error('FaceCropper: Error detecting face:', error);
            imgElement.style.objectPosition = 'center top';
        }
    }

    processAvatar(imgElement, containerElement) {
        if (!this.modelsLoaded) {
            setTimeout(() => this.processAvatar(imgElement, containerElement), 500);
            return;
        }

        if (imgElement.complete) {
            this.cropImageToFace(imgElement, containerElement);
        } else {
            imgElement.onload = () => this.cropImageToFace(imgElement, containerElement);
        }
    }
}

// Create global instance
const faceCropper = new FaceCropper();
