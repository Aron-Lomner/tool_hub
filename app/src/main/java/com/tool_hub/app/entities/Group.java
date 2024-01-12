package com.tool_hub.app.entities;

import java.util.List;

import org.springframework.context.annotation.Description;

import com.tool_hub.app.dtos.GroupDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 255)
    private String name;
    @Column(length = 1000)
    private String description;
    @Column(length = 100)
    private String imageUrl;

    @ManyToMany(mappedBy = "groups")
    private List<User> members;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<ToolOrder> toolOffers;

    public Group(GroupDto dto) {
        this.name = dto.getName();
        this.description = dto.getDescription();
        this.imageUrl = dto.getImageUrl();
    }

}
