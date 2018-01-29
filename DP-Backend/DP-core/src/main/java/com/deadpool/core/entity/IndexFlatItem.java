package com.deadpool.core.entity;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IndexFlatItem {

    String category;
    String title;
    String path;
    String nav;

    public IndexFlatItem(IndexItem indexItem){
        this.category = indexItem.getCategory();
        this.title = indexItem.getTitle();
        this.path = indexItem.getPath();
        this.nav = indexItem.getNav();
    }

}
