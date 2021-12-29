namespace WebApplication1.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Employee")]
    public partial class Employee
    {
        [Key]
        public int EmployeeID { get; set; }

        [Required]
        [StringLength(500)]
        public string EmployeeName { get; set; }

        [Required]
        [StringLength(500)]
        public string Department { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DateofJoin { get; set; }

        [StringLength(500)]
        public string PhotoFileName { get; set; }
    }
}
