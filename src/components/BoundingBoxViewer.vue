<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from "vue";

interface BoundingBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  category: string;
}

interface MammographyImage {
  imagePath: string;
  coordinates: BoundingBox[];
}

const props = defineProps<{ image: MammographyImage }>();
const resizingBox = ref<{ box: BoundingBox; direction: string } | null>(null);
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);

const note = ref("");

const saveNote = () => {
  console.log("Saved Note:", note.value);
  alert("Note saved!");
};

const startResize = (
  box: BoundingBox,
  event: MouseEvent,
  direction: string
) => {
  isResizing.value = true;
  resizingBox.value = { box, direction };
  startX.value = event.clientX;
  startY.value = event.clientY;
  event.stopPropagation();
};

const resizeBoundingBox = (event: MouseEvent) => {
  if (!isResizing.value || !resizingBox.value) return;

  const { box, direction } = resizingBox.value;
  const dx = event.clientX - startX.value;
  const dy = event.clientY - startY.value;

  // Adjust based on handle direction
  if (direction.includes("left")) box.xmin += dx;
  if (direction.includes("right")) box.xmax += dx;
  if (direction.includes("top")) box.ymin += dy;
  if (direction.includes("bottom")) box.ymax += dy;

  startX.value = event.clientX;
  startY.value = event.clientY;
};

const stopResize = () => {
  isResizing.value = false;
  resizingBox.value = null;
};

onMounted(() => {
  document.addEventListener("mousemove", resizeBoundingBox);
  document.addEventListener("mouseup", stopResize);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", resizeBoundingBox);
  document.removeEventListener("mouseup", stopResize);
});
</script>

<template>
  <div v-if="image" class="bounding-box-viewer">
    <!-- Left Section: Image with Bounding Boxes -->
    <div class="bounding-box-container">
      <img
        :src="image.imagePath"
        alt="Mammography Image"
        class="enlarged-image"
      />
      <div
        v-for="(box, index) in image.coordinates"
        :key="index"
        class="bounding-box"
        :style="{
          left: `${box.xmin}px`,
          top: `${box.ymin}px`,
          width: `${box.xmax - box.xmin}px`,
          height: `${box.ymax - box.ymin}px`,
        }"
      >
        <!-- Resize Handles -->
        <div
          class="resize-handle top-left"
          @mousedown="startResize(box, $event, 'top-left')"
        ></div>
        <div
          class="resize-handle top-right"
          @mousedown="startResize(box, $event, 'top-right')"
        ></div>
        <div
          class="resize-handle bottom-left"
          @mousedown="startResize(box, $event, 'bottom-left')"
        ></div>
        <div
          class="resize-handle bottom-right"
          @mousedown="startResize(box, $event, 'bottom-right')"
        ></div>
        <div
          class="resize-handle left"
          @mousedown="startResize(box, $event, 'left')"
        ></div>
        <div
          class="resize-handle right"
          @mousedown="startResize(box, $event, 'right')"
        ></div>
        <div
          class="resize-handle top"
          @mousedown="startResize(box, $event, 'top')"
        ></div>
        <div
          class="resize-handle bottom"
          @mousedown="startResize(box, $event, 'bottom')"
        ></div>
      </div>
    </div>

    <!-- Right Section: Bounding Box Details -->
    <div class="description-panel">
      <p v-html="image?.description || 'Nema detektirane lezije'"></p>
      <div class="note-editor">
        <textarea v-model="note" placeholder="Enter your notes here..." />
        <button @click="saveNote">Save Note</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bounding-box-viewer {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.bounding-box-container {
  position: relative;
  display: inline-block;
}

.enlarged-image {
  width: 450px;
  height: 550px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.bounding-box {
  position: absolute;
  border: 2px solid red;
  background: rgba(255, 0, 0, 0.2);
}

/* Resize Handles */
.resize-handle {
  width: 5px;
  height: 5px;
  background: rgb(126, 27, 27);
  position: absolute;
  cursor: pointer;
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}
.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}
.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}
.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}
.left {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  cursor: ew-resize;
}
.right {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  cursor: ew-resize;
}
.top {
  left: 50%;
  top: -5px;
  transform: translateX(-50%);
  cursor: ns-resize;
}
.bottom {
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.description-panel {
  flex: 1;
  max-width: 550px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.box-details {
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.note-editor {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-editor h3 {
  font-size: 16px;
  font-weight: bold;
}

.note-editor textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

.note-editor button {
  background-color: #bd7158;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.note-editor button:hover {
  background-color: #bd7158;
}
</style>
