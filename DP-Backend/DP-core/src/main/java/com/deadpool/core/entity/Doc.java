package com.deadpool.core.entity;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Doc {
    String category;
    String title;
    String path;
    String nav;
    String content;
}
