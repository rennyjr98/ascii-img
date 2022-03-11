import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'media-ascii';
  public inBAndW: boolean = true;
  public renderedImgQuality: number = 100;
  public canvas?: p5 = undefined;
  constructor() {}

  ngOnInit(): void {}

  uploadImg(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList != null) {
      if (fileList[0].type.includes('image')) {
        this.generateImg(fileList[0], this.renderedImgQuality, this.inBAndW);
      }
    }
  }

  generateImg(imgFile: File, imgQuality: number, inBAndW: boolean) {
    if (this.canvas) {
      this.canvas.remove();
    }

    const imgURL: any = URL.createObjectURL(imgFile);
    const sketch = (s: p5) => {
      const density = 'Ñ@#W$9876543210?!abc;:+=-,._     ';
      let img: any;

      s.preload = () => {
        img = s.loadImage(imgURL);
      };

      s.setup = () => {
        const orientation: number =
          img.width === img.height ? 0 : img.width > img.height ? 1 : 2;
        const isLowSize: boolean = img.width < 800 || img.height < 800;
        let width, height;
        switch (orientation) {
          case 0:
            width = height = isLowSize ? 800 : img.width;
            break;
          case 1:
            width = isLowSize ? 1200 : img.width;
            height = isLowSize ? 800 : img.height;
            break;
          case 2:
            width = isLowSize ? 800 : img.width;
            height = isLowSize ? 1200 : img.height;
            break;
        }
        s.createCanvas(width, height);
        s.noLoop();
      };

      s.draw = () => {
        s.background(0);
        if (img.width === img.height) {
          img.resize(imgQuality, imgQuality);
        } else {
          img.resize(
            img.width > img.height ? imgQuality * 2 : imgQuality,
            img.width < img.height ? imgQuality * 2 : imgQuality
          );
        }
        let w = s.width / img.width;
        let h = s.height / img.height;
        img.loadPixels();

        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            const pixelIndex = (i + j * img.width) * 4;
            const r = img.pixels[pixelIndex + 0];
            const g = img.pixels[pixelIndex + 1];
            const b = img.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;

            s.noStroke();
            if (inBAndW) {
              s.fill(avg);
            } else {
              s.fill(r, g, b);
            }

            const len = density.length;
            const charIndex = s.floor(s.map(avg, 0, 255, len, 0));

            s.textSize(w + h / 2);
            s.textAlign(s.CENTER, s.CENTER);
            s.text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
          }
        }
        s.save();
      };
    };

    this.canvas = new p5(sketch);
  }
}
