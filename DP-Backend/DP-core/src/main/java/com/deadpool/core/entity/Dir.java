package com.deadpool.core.entity;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Dir {

    private String name;
    private String sha;
    private String path;

}
