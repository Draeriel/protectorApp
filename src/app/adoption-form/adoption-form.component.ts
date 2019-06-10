import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Questionnaire } from './questionnaire.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {

  adoptionForm: FormGroup;
  userId = '';
  questionnaire: Questionnaire;
  user: '';

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private params: ActivatedRoute,
  ) { this.createForm()}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.params.params.subscribe( params => {

    this.userId = params.id ? params.id : this.user['id'];

    this.firebaseService.getQuestionnaire(this.userId).subscribe(questionnaire => {
      this.questionnaire = questionnaire;
      this.updateForm();
    });
  })
  }

  createForm() {
    this.adoptionForm = this.formBuilder.group({
      mudanzaExtranjero: [['']],

      houseType: [''],
      meters: [''],
      balcon: [''],
      park: [''],

      petWithFamily: [''],
      livingPlaces: [''],
      forbiddenPlaces: [''],
      sleepingPlaces: [''],
      caseroAllows: [''],

      peopleAmount: [''],
      ages: [''],
      allAgreement: [''],
      morePets: [''],
      pastPetsExperiences: [''],

      outsideTime: [''],
      dogWalks: [''],
      extraPetTime: [''],
      hollydays: [''],
    });
  }

  updateForm() {
    this.adoptionForm.patchValue({
      mudanzaExtranjero: this.questionnaire.mudanzaExtranjero,

      houseType: this.questionnaire.houseType,
      meters: this.questionnaire.meters,
      balcon: this.questionnaire.balcon,
      park: this.questionnaire.park,

      petWithFamily: this.questionnaire.petWithFamily,
      livingPlaces: this.questionnaire.livingPlaces,
      forbiddenPlaces: this.questionnaire.forbiddenPlaces,
      sleepingPlaces: this.questionnaire.sleepingPlaces,
      caseroAllows: this.questionnaire.caseroAllows,

      peopleAmount: this.questionnaire.peopleAmount,
      ages: this.questionnaire.ages,
      allAgreement: this.questionnaire.allAgreement,
      morePets: this.questionnaire.morePets,
      pastPetsExperiences: this.questionnaire.pastPetsExperiences,

      outsideTime: this.questionnaire.outsideTime,
      dogWalks: this.questionnaire.dogWalks,
      extraPetTime: this.questionnaire.extraPetTime,
      hollydays: this.questionnaire.hollydays
    });
  }

  updateQuestionnair() {
    this.firebaseService.postUserQuestionnaire(this.userId, this.adoptionForm.value);
  }
}
