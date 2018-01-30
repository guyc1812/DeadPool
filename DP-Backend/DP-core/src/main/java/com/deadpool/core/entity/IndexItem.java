package com.deadpool.core.entity;


import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IndexItem {

    String category;
    String title;
    String path;
    String nav;
    int status;
    List<IndexItem> items;

}
