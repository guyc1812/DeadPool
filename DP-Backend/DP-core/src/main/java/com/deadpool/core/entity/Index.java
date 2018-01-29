package com.deadpool.core.entity;

import lombok.*;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Index {
    String id;
    List<IndexItem> index;
}
