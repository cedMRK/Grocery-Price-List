import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  items: any[] = [];
  filteredItems: any[] = [];
  newItemName: string = '';
  newItemCategory: string = '';
  newItemPrice: number = 0;
  searchTerm: string = '';
  editedItem: any = null;

  constructor(private router: Router) {}

  addItem() {
    const newItem = {
      name: this.newItemName,
      category: this.newItemCategory,
      price: this.newItemPrice
    };
    this.items.push(newItem);
    this.filteredItems.push(newItem);
    this.resetFields();
    this.saveItems();
  }

  filterItems() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.filteredItems = this.items.filter(item => {
        return (
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else {
      this.filteredItems = this.items;
    }
  }

  resetFields() {
    this.newItemName = '';
    this.newItemCategory = '';
    this.newItemPrice = 0;
  }

  editItem(item: any) {
    this.editedItem = item;
    this.newItemName = item.name;
    this.newItemCategory = item.category;
    this.newItemPrice = item.price;
    // Move the edited item back to input fields
    const itemIndex = this.items.indexOf(item);
    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
      this.filteredItems.splice(itemIndex, 1);
    }
  }

  saveItemChanges() {
    if (this.editedItem) {
      const updatedItem = {
        name: this.newItemName,
        category: this.newItemCategory,
        price: this.newItemPrice
      };
      this.items.push(updatedItem);
      this.filteredItems.push(updatedItem);
      this.editedItem = null;
      this.resetFields();
      this.saveItems();
    }
  }

  deleteItem(item: any) {
    const itemIndex = this.items.indexOf(item);
    if (itemIndex > -1) {
      this.items.splice(itemIndex, 1);
      this.filteredItems.splice(itemIndex, 1); // Remove from filtered items
      this.resetFields();
      this.saveItems();
    }
  }

  saveItems() {
    localStorage.setItem('groceryItems', JSON.stringify(this.items));
  }

  loadItems() {
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
      this.filteredItems = this.items;
    }
  }
  
  logout(){
    this.router.navigate(['login']);
  }

}
