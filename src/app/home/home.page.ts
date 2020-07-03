import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // This code was inspired from mhartington's github repo, https://github.com/mhartington/v5-animations
  slideRouterAnimation = (_: HTMLElement, opts: any) => {
    const backDirection = opts.direction === 'back';
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;

    const getIonPageElement = (element: HTMLElement) => {
      if (element.classList.contains('ion-page')) {
        return element;
      }

      const ionPage = element.querySelector(
        ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
      );
      if (ionPage) {
        return ionPage;
      }
      return element;
    };

    const enteringPageEl = getIonPageElement(enteringEl);

    const rootTransition = this.animationController.create();

    const enterTransition = this.animationController.create();
    const leavingTransition = this.animationController.create();

    leavingTransition
      .addElement(getIonPageElement(leavingEl))
      .duration(540);

    enterTransition
      .addElement(enteringPageEl)
      .duration(540)
      .fill('both')
      .beforeRemoveClass('ion-page-invisible');

    if (!backDirection) {
      enterTransition
        .beforeStyles({ shadow: '5px 6px 20px rgba(0, 0, 0, 0.15)' })
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .keyframes([
          { offset: 0, transform: 'translateY(100vh)' },
          { offset: 1, transform: 'translateY(0)' }
        ])
        .afterClearStyles(['shadow']);
    } else {
      leavingTransition
        .beforeStyles({ shadow: '5px 6px 20px rgba(0, 0, 0, 0.15)' })
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .keyframes([
          { offset: 0, transform: 'translateY(0)' },
          { offset: 1, transform: 'translateY(100vh)' }
        ])
        .afterClearStyles(['shadow']);
    }

    rootTransition.addAnimation([enterTransition, leavingTransition]);

    return rootTransition;
  };

  constructor(
    public animationController: AnimationController
  ) { }

}
