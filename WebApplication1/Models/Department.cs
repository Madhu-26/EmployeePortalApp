namespace WebApplication1.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Department")]
    public partial class Department
    {
        [Key]
        public int DepartmentID { get; set; }

        [Required]
        [StringLength(500)]
        public string DepartmentName { get; set; }
    }
}
