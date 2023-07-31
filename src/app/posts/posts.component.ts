import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  valorInput: string = '';
  posts: any = [];
  posts5: any = [];
  pageStart: number = 0;
  pageNumber: number = 5;
  previousButtonDisabled: boolean = true;
  nextButtonDisabled: boolean = false;
  elementoClicado: any = {title: '', body: '' };
  elementoPesquisado: any =  {title: '', body: ''};
  disablePosts: boolean = false;
  aux1: boolean = this.previousButtonDisabled;
  aux2: boolean = this.nextButtonDisabled;
  disableReturnButton: boolean = false;
  disableSearchButton: boolean = false;
  constructor(private postsService: PostsService) {

  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(
      (data) => {
        console.log(data);
        this.posts = data;
        for (let i = this.pageStart; i < this.pageNumber; i++) {
          this.posts5.push(this.posts[i]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  paginationNext() {
    if (this.pageNumber === this.posts.length - 5) {
      this.nextButtonDisabled = !this.nextButtonDisabled;
    }
    else {
      this.previousButtonDisabled = false;
      this.nextButtonDisabled = false;
    }
    this.posts5 = [];
    this.pageStart += 5;
    this.pageNumber += 5;
    for (let i = this.pageStart; i < this.pageNumber; i++) {
      this.posts5.push(this.posts[i]);
    }
  }

  paginationPrevious() {
    if (this.pageStart === 5) {
      this.previousButtonDisabled = true;
    }
    else {
      this.nextButtonDisabled = false;
    }

    this.posts5 = [];
    this.pageStart -= 5;
    this.pageNumber -= 5;
    for (let i = this.pageStart; i < this.pageNumber; i++) {
      this.posts5.push(this.posts[i]);
    }
  }

  clickPost(event: MouseEvent): void {
    this.posts5 = [];
    const elemento = event.currentTarget as HTMLElement;
    this.elementoClicado = this.posts[Number(elemento.id) - 1];
    this.aux1 = this.previousButtonDisabled;
    this.aux2 = this.nextButtonDisabled;
    this.previousButtonDisabled = true;
    this.nextButtonDisabled = true;
    this.disableReturnButton = false;
    this.disableSearchButton = true;
  }

  returnClick() {
    this.disableReturnButton = true;
    this.elementoClicado = { title: '', body: '' };
    this.elementoPesquisado = { title: '', body: '' };
    this.previousButtonDisabled = this.aux1;
    this.nextButtonDisabled = this.aux2;
    for (let i = this.pageStart; i < this.pageNumber; i++) {
      this.posts5.push(this.posts[i]);
    }
    this.disableSearchButton = false;
  }

  searchPost() {
    let verifica: boolean = false;
    console.log(this.valorInput);
    this.posts.forEach((element: { body: string, id: number, title: string, userId: number }) => {
      if (element.title == this.valorInput) {
        verifica = true;
        this.elementoPesquisado = this.posts[Number(element.id) - 1];
      }
    });
    if (verifica) {
      this.posts5 = [];
      this.aux1 = this.previousButtonDisabled;
      this.aux2 = this.nextButtonDisabled;
      this.previousButtonDisabled = true;
      this.nextButtonDisabled = true;
      this.disableReturnButton = false;
      this.disableSearchButton = true;
    }
    else {
      alert("Esse post não existe!!!");
    }
  }
}
